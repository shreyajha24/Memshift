import { validateEmailForWaitlist, normalizeEmail } from '../../shared/waitlistCommon.js';

export interface WaitlistRegistrationResult {
  success: boolean;
  status?: 'pending' | 'verified' | 'rate_limited';
  rateLimited?: boolean;
  verifiedCount?: number;
  spot?: number;
  isNew?: boolean;
  isExisting?: boolean;
  pending?: boolean;
  message?: string;
}

export interface WaitlistStats {
  verifiedCount: number;
  latestSpot: number;
}

export interface WaitlistVerificationResult {
  success: boolean;
  status?: 'verified';
  spot?: number;
  verifiedCount?: number;
  message?: string;
}

export interface WaitlistCallbackResult {
  success: boolean;
  message: string;
}

export function validateJoinEmail(email: string) {
  return validateEmailForWaitlist(email);
}

export function normalizeJoinEmail(email: string) {
  return normalizeEmail(email);
}

async function readJsonResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) {
    throw new Error('Empty response from waitlist API.');
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error('Invalid response from waitlist API.');
  }
}

function extractErrorMessage(payload: any, fallback: string) {
  return payload?.message || payload?.error || fallback;
}

export async function registerWaitlistUser(email: string, honeypot = ''): Promise<WaitlistRegistrationResult> {
  const validation = validateEmailForWaitlist(email);
  if (!validation.ok) {
    return { success: false, message: validation.message };
  }

  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: validation.email,
      honeypot,
    }),
  });

  const data = await readJsonResponse<WaitlistRegistrationResult | { success?: boolean; message?: string }>(res);
  if (!res.ok || !data.success) {
    const isRateLimited = res.status === 429 || (data as any)?.rateLimited || (data as any)?.status === 'rate_limited';
    return {
      success: false,
      rateLimited: isRateLimited,
      status: isRateLimited ? 'rate_limited' : undefined,
      message: extractErrorMessage(
        data,
        isRateLimited
          ? 'Verification email limit reached. Please wait before requesting another email.'
          : 'Failed to join the waitlist.'
      ),
    };
  }

  return data as WaitlistRegistrationResult;
}

export async function resendVerification(email: string): Promise<WaitlistRegistrationResult> {
  const validation = validateEmailForWaitlist(email);
  if (!validation.ok) {
    return { success: false, message: validation.message };
  }

  const res = await fetch('/api/waitlist/resend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: validation.email }),
  });

  const data = await readJsonResponse<WaitlistRegistrationResult | { success?: boolean; message?: string }>(res);
  if (!res.ok || !data.success) {
    const isRateLimited = res.status === 429 || (data as any)?.rateLimited || (data as any)?.status === 'rate_limited';
    return {
      success: false,
      rateLimited: isRateLimited,
      status: isRateLimited ? 'rate_limited' : undefined,
      message: extractErrorMessage(
        data,
        isRateLimited
          ? 'Verification email limit reached. Please wait before requesting another email.'
          : 'Failed to resend verification email.'
      ),
    };
  }

  return data as WaitlistRegistrationResult;
}

export async function fetchWaitlistStats(): Promise<WaitlistStats> {
  const res = await fetch('/api/waitlist');
  const data = await readJsonResponse<any>(res);

  if (!res.ok || !data.success) {
    throw new Error(extractErrorMessage(data, 'Failed to load waitlist stats.'));
  }

  return {
    verifiedCount: data.count ?? 0,
    latestSpot: (data.count ?? 0) > 0 ? 100 + data.count : 100,
  };
}

export async function verifyWaitlistCallback(accessToken: string): Promise<WaitlistVerificationResult> {
  const res = await fetch('/api/waitlist/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
  });

  const data = await readJsonResponse<WaitlistVerificationResult | { success?: boolean; message?: string }>(res);
  if (!res.ok || !data.success) {
    return {
      success: false,
      message: extractErrorMessage(data, 'Failed to verify waitlist registration.'),
    };
  }

  return data as WaitlistVerificationResult;
}
