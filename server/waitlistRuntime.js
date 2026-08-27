import { createClient } from '@supabase/supabase-js';
import { maskEmail, normalizeEmail, validateEmailForWaitlist } from '../shared/waitlistCommon.js';

const RESEND_COOLDOWN_MS = 10 * 60 * 1000;
const RECENT_LIMIT = 6;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 6;

const requestLog = new Map();

function getRequiredEnv(name, aliases = []) {
  const names = [name, ...aliases];
  for (const candidate of names) {
    const value = process.env[candidate];
    if (value && String(value).trim()) {
      return String(value).trim();
    }
  }
  throw new Error(`Missing required environment variable: ${names.join(' or ')}`);
}

function getSupabaseConfig() {
  const url = getRequiredEnv('VITE_SUPABASE_URL');
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');
  const anonKey = getRequiredEnv('VITE_SUPABASE_ANON_KEY');

  return { url, serviceRoleKey, anonKey };
}

function createSupabaseClients() {
  const { url, serviceRoleKey, anonKey } = getSupabaseConfig();

  const admin = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const auth = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });

  return { admin, auth, url };
}

function getOrigin(req) {
  const appUrl = (process.env.APP_URL || process.env.SITE_URL || '').trim();

  const isProduction =
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL_ENV === 'production' ||
    process.env.VERCEL === '1';

  if (!appUrl && isProduction) {
    throw new Error('APP_URL is required in production');
  }

  if (appUrl) {
    return appUrl.startsWith('http://') || appUrl.startsWith('https://')
      ? appUrl
      : `https://${appUrl}`;
  }

  const headerOrigin = req?.headers?.origin || req?.headers?.referer;
  if (headerOrigin) {
    try {
      return new URL(headerOrigin).origin;
    } catch {
      // fall through
    }
  }

  return 'http://localhost:5173';
}

function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const first = String(forwarded).split(',')[0].trim();
    if (first) return first;
  }
  return req.socket?.remoteAddress || 'unknown';
}

function allowRequest(key, limit, windowMs) {
  const now = Date.now();
  const bucket = requestLog.get(key) || [];
  const recent = bucket.filter((timestamp) => now - timestamp < windowMs);
  if (recent.length >= limit) {
    requestLog.set(key, recent);
    return false;
  }
  recent.push(now);
  requestLog.set(key, recent);
  return true;
}

function computeSpot(index, totalVerified) {
  return 100 + (totalVerified - index);
}

async function fetchVerifiedStats(admin) {
  const { data, error, count } = await admin
    .from('waitlist')
    .select('id,email,created_at,verified_at,status', { count: 'exact' })
    .eq('status', 'verified')
    .order('verified_at', { ascending: true });

  if (error) {
    throw error;
  }

  const verifiedRows = data || [];
  const verifiedCount = count ?? verifiedRows.length;
  const recentMembers = verifiedRows.slice(-RECENT_LIMIT).reverse().map((row, index) => ({
    id: row.id,
    maskedEmail: maskEmail(row.email),
    spot: computeSpot(index, verifiedCount),
    verifiedAt: row.verified_at || row.created_at,
  }));

  return { verifiedCount, recentMembers, latestSpot: verifiedCount > 0 ? 100 + verifiedCount : 100 };
}

async function fetchVerifiedSpot(admin, email) {
  const { data, error } = await admin
    .from('waitlist')
    .select('email,verified_at,created_at')
    .eq('status', 'verified')
    .order('verified_at', { ascending: true });

  if (error) {
    throw error;
  }

  const rows = data || [];
  const index = rows.findIndex((row) => row.email === email);
  return index === -1 ? null : 101 + index;
}

async function ensureWaitlistRow(admin, email, status, extra = {}) {
  const payload = {
    email,
    status,
    created_at: extra.created_at || new Date().toISOString(),
    verified_at: extra.verified_at || null,
    last_verification_sent_at: extra.last_verification_sent_at || null,
    resend_count: extra.resend_count || 0,
  };

  const { error } = await admin.from('waitlist').upsert(payload, { onConflict: 'email' });
  if (error) throw error;

  const { data, error: selectError } = await admin.from('waitlist').select('*').eq('email', email).single();
  if (selectError) throw selectError;
  return data;
}

function isSupabaseEmailRateLimitError(error) {
  if (!error) return false;
  const status = error.status || error.statusCode || error.code;
  const code = String(error.code || '');
  const message = String(error.message || error.error_description || '').toLowerCase();

  return (
    status === 429 ||
    status === '429' ||
    code === 'over_email_send_rate_limit' ||
    code === 'over_request_rate_limit' ||
    message.includes('rate limit') ||
    message.includes('over_email_send_rate_limit') ||
    message.includes('email rate limit')
  );
}

function logSafeAuthError(context, error) {
  console.error(`Supabase Auth error in ${context}:`, {
    name: error?.name || 'Error',
    code: error?.code || 'unknown',
    status: error?.status || error?.statusCode || 'unknown',
    message: error?.message || 'Unknown error message',
  });
}

function isAuthEmailVerified(user) {
  return Boolean(user?.email_confirmed_at || user?.confirmed_at);
}

function buildVerificationRedirectUrl(baseUrl) {
  const origin = (baseUrl && String(baseUrl).trim()) || 'https://memshift.vercel.app';
  const cleanBase = origin.replace(/\/+$/, '');
  return `${cleanBase}/?waitlist=verify`;
}

async function sendVerificationEmail(auth, email, redirectTo) {
  console.log('[WAITLIST] email redirect:', redirectTo);
  const emailRedirectTo = buildVerificationRedirectUrl(redirectTo);
  console.log('[WAITLIST] emailRedirectTo:', emailRedirectTo);

  const { error } = await auth.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo,
    },
  });

  if (error) {
    throw error;
  }
}

function parseResendCooldown(row) {
  if (!row?.last_verification_sent_at) return true;
  const lastSent = new Date(row.last_verification_sent_at).getTime();
  return Number.isNaN(lastSent) || Date.now() - lastSent >= RESEND_COOLDOWN_MS;
}

async function handleJoin(req, res, admin, auth) {
  const body = await readBody(req);
  const normalized = validateEmailForWaitlist(body.email);

  if (body.honeypot && String(body.honeypot).trim()) {
    return json(res, 400, { success: false, message: 'Unable to process request.' });
  }

  if (!normalized.ok) {
    return json(res, 400, { success: false, message: normalized.message });
  }

  const email = normalizeEmail(normalized.email);
  const ipKey = `join:${getClientIp(req)}`;
  if (!allowRequest(ipKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return json(res, 429, { success: false, message: 'Too many requests. Please wait a minute and try again.' });
  }

  const { data: existing, error: lookupError } = await admin.from('waitlist').select('*').eq('email', email).maybeSingle();
  if (lookupError) {
    throw lookupError;
  }

  if (existing?.status === 'verified') {
    const stats = await fetchVerifiedStats(admin);
    const spot = await fetchVerifiedSpot(admin, email);
    return json(res, 200, {
      success: true,
      status: 'verified',
      isExisting: true,
      email,
      message: "You're already on the MemShift waitlist.",
      verifiedAt: existing.verified_at,
      spot,
      verifiedCount: stats.verifiedCount,
      stats,
    });
  }

  const now = new Date().toISOString();
  const row = await ensureWaitlistRow(admin, email, 'pending', {
    created_at: existing?.created_at || now,
    last_verification_sent_at: existing?.last_verification_sent_at || null,
    resend_count: existing?.resend_count || 0,
  });

  if (existing && !parseResendCooldown(existing)) {
    return json(res, 200, {
      success: true,
      status: 'pending',
      isExisting: true,
      email,
      message: 'Check your inbox to verify your email.',
      pending: true,
    });
  }

  try {
    await sendVerificationEmail(auth, email, getOrigin(req));
  } catch (emailError) {
    logSafeAuthError('handleJoin', emailError);
    if (isSupabaseEmailRateLimitError(emailError)) {
      return json(res, 429, {
        success: false,
        status: 'rate_limited',
        rateLimited: true,
        email,
        message: 'Verification email limit reached. Please wait before requesting another email.',
      });
    }
    throw emailError;
  }

  const updated = await ensureWaitlistRow(admin, email, 'pending', {
    created_at: row.created_at || now,
    last_verification_sent_at: now,
    resend_count: (row.resend_count || 0) + 1,
  });

  return json(res, 202, {
    success: true,
    status: 'pending',
    isNew: !existing,
    isExisting: !!existing,
    email,
    message: 'Check your inbox to verify your email.',
    pending: true,
    resendAvailableAt: updated.last_verification_sent_at,
  });
}

async function handleResend(req, res, admin, auth) {
  const body = await readBody(req);
  const normalized = validateEmailForWaitlist(body.email);

  if (!normalized.ok) {
    return json(res, 400, { success: false, message: normalized.message });
  }

  const email = normalizeEmail(normalized.email);
  const ipKey = `resend:${getClientIp(req)}`;
  if (!allowRequest(ipKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return json(res, 429, { success: false, message: 'Too many requests. Please wait a minute and try again.' });
  }

  const { data: row, error } = await admin.from('waitlist').select('*').eq('email', email).maybeSingle();
  if (error) {
    throw error;
  }

  if (!row) {
    return json(res, 404, { success: false, message: 'No pending registration was found for that email.' });
  }

  if (row.status === 'verified') {
    const spot = await fetchVerifiedSpot(admin, email);
    return json(res, 200, {
      success: true,
      status: 'verified',
      isExisting: true,
      email,
      spot,
      message: "You're already on the MemShift waitlist.",
    });
  }

  if (!parseResendCooldown(row)) {
    return json(res, 429, {
      success: false,
      status: 'rate_limited',
      rateLimited: true,
      message: 'A verification email was already sent recently. Check your inbox.',
    });
  }

  try {
    await sendVerificationEmail(auth, email, getOrigin(req));
  } catch (emailError) {
    logSafeAuthError('handleResend', emailError);
    if (isSupabaseEmailRateLimitError(emailError)) {
      return json(res, 429, {
        success: false,
        status: 'rate_limited',
        rateLimited: true,
        email,
        message: 'Verification email limit reached. Please wait before requesting another email.',
      });
    }
    throw emailError;
  }

  await admin
    .from('waitlist')
    .update({
      last_verification_sent_at: new Date().toISOString(),
      resend_count: (row.resend_count || 0) + 1,
    })
    .eq('email', email);

  return json(res, 200, {
    success: true,
    status: 'pending',
    isExisting: true,
    email,
    message: 'Verification email sent. Check your inbox.',
  });
}

async function handleVerify(req, res, admin) {
  const body = await readBody(req);
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const accessToken = String(body.accessToken || bearerToken || '').trim();

  if (!accessToken) {
    return json(res, 400, { success: false, message: 'Missing verification session.' });
  }

  const ipKey = `verify:${getClientIp(req)}`;
  if (!allowRequest(ipKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return json(res, 429, { success: false, message: 'Too many verification attempts. Please wait a minute and try again.' });
  }

  const { data: userResult, error: userError } = await admin.auth.getUser(accessToken);
  const authUser = userResult?.user;
  if (userError || !authUser?.email) {
    logSafeAuthError('handleVerify', userError);
    return json(res, 401, { success: false, message: 'Verification session is invalid or expired.' });
  }

  if (!isAuthEmailVerified(authUser)) {
    console.warn('[WAITLIST] Verification blocked for unconfirmed Supabase user:', {
      userId: authUser.id,
      email: maskEmail(authUser.email),
    });
    return json(res, 403, { success: false, message: 'Email verification has not completed yet.' });
  }

  const email = normalizeEmail(authUser.email);
  const now = new Date().toISOString();
  const { data: existing, error: lookupError } = await admin.from('waitlist').select('*').eq('email', email).maybeSingle();
  if (lookupError) {
    throw lookupError;
  }

  if (!existing) {
    console.warn('[WAITLIST] No waitlist row matched verified Supabase user:', {
      userId: authUser.id,
      email: maskEmail(email),
    });
    return json(res, 404, {
      success: false,
      message: 'No waitlist registration matched this verified email.',
    });
  }

  if (existing?.status === 'verified') {
    const stats = await fetchVerifiedStats(admin);
    const spot = await fetchVerifiedSpot(admin, email);
    return json(res, 200, {
      success: true,
      status: 'verified',
      email,
      spot,
      verifiedAt: existing.verified_at,
      message: "Email verified! You're officially on the MemShift waitlist.",
      verifiedCount: stats.verifiedCount,
      stats,
    });
  }

  const { data: verifiedRow, error: updateError } = await admin
    .from('waitlist')
    .update({
      status: 'verified',
      verified_at: now,
    })
    .eq('email', email)
    .select('*')
    .maybeSingle();

  if (updateError) {
    throw updateError;
  }

  if (!verifiedRow) {
    console.warn('[WAITLIST] Verified update matched no waitlist row:', {
      userId: authUser.id,
      email: maskEmail(email),
    });
    return json(res, 404, {
      success: false,
      message: 'No waitlist registration matched this verified email.',
    });
  }

  const stats = await fetchVerifiedStats(admin);
  const spot = (await fetchVerifiedSpot(admin, email)) || stats.latestSpot;

  return json(res, 200, {
    success: true,
    status: 'verified',
    email,
    spot,
    verifiedAt: verifiedRow.verified_at || now,
    message: "Email verified! You're officially on the MemShift waitlist.",
    verifiedCount: stats.verifiedCount,
    stats,
  });
}

async function handleStats(req, res, admin) {
  const stats = await fetchVerifiedStats(admin);
  return json(res, 200, {
    success: true,
    verifiedCount: stats.verifiedCount,
    latestSpot: stats.latestSpot,
    recentMembers: stats.recentMembers,
  });
}

export async function handleWaitlistApi(req, res) {
  try {
    const { admin, auth } = createSupabaseClients();
    const url = req.url || '';

    if (req.method === 'GET' && (url === '/api/waitlist' || url.startsWith('/api/waitlist?'))) {
      return await handleStats(req, res, admin);
    }

    if (req.method === 'POST' && url === '/api/waitlist') {
      return await handleJoin(req, res, admin, auth);
    }

    if (req.method === 'POST' && url === '/api/waitlist/resend') {
      return await handleResend(req, res, admin, auth);
    }

    if (req.method === 'POST' && url === '/api/waitlist/verify') {
      return await handleVerify(req, res, admin);
    }

    return json(res, 404, { success: false, message: 'Not found' });
  } catch (error) {
    if (isSupabaseEmailRateLimitError(error)) {
      logSafeAuthError('handleWaitlistApi', error);
      return json(res, 429, {
        success: false,
        status: 'rate_limited',
        rateLimited: true,
        message: 'Verification email limit reached. Please wait before requesting another email.',
      });
    }
    console.error('Waitlist API error:', {
      name: error?.name || 'Error',
      message: error?.message || 'Unexpected waitlist error',
    });
    return json(res, 500, {
      success: false,
      message: 'The waitlist is temporarily unavailable. Please try again soon.',
    });
  }
}
