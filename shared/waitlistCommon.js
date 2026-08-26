const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'mailinator.net',
  'mailinator.org',
  '10minutemail.com',
  '10minutemail.net',
  '10minutemail.org',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'yopmail.com',
  'yopmail.net',
  'yopmail.fr',
  'temp-mail.org',
  'tempmail.com',
  'tempmail.net',
  'tempmail.org',
  'trashmail.com',
  'trashmail.net',
  'dispostable.com',
  'getnada.com',
  'maildrop.cc',
  'throwawaymail.com',
  'sharklasers.com',
  'fakeinbox.com',
  'moakt.com',
  'moakt.ws',
  'maileater.com',
  'mailnesia.com',
  'burnermail.io',
  'inboxkitten.com',
  'mintemail.com',
  'emailondeck.com',
  'spamex.com',
  'temp-mail.io',
  'tempail.com',
]);

const PLACEHOLDER_LOCAL_PARTS = new Set([
  'test',
  'testing',
  'example',
  'demo',
  'sample',
  'hello',
  'mail',
  'user',
  'users',
  'abc',
  'aaaa',
  'temp',
  'fake',
  'invalid',
  'placeholder',
  'name',
]);

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function isValidEmailSyntax(email) {
  return EMAIL_REGEX.test(normalizeEmail(email));
}

export function isDisposableEmail(email) {
  const normalized = normalizeEmail(email);
  const parts = normalized.split('@');
  if (parts.length !== 2) return false;

  const domain = parts[1];
  if (DISPOSABLE_DOMAINS.has(domain)) return true;

  return domain.includes('mailinator') ||
    domain.includes('tempmail') ||
    domain.includes('10minutemail') ||
    domain.includes('guerrillamail') ||
    domain.includes('yopmail') ||
    domain.includes('trashmail') ||
    domain.includes('dispostable') ||
    domain.includes('getnada') ||
    domain.includes('burnermail') ||
    domain.includes('fakeinbox') ||
    domain.includes('maildrop') ||
    domain.includes('moakt');
}

export function isPlaceholderEmail(email) {
  const normalized = normalizeEmail(email);
  const parts = normalized.split('@');
  if (parts.length !== 2) return true;

  const [localPart, domain] = parts;

  if (!localPart || !domain) return true;
  if (localPart.length < 2) return true;
  if (PLACEHOLDER_LOCAL_PARTS.has(localPart)) return true;
  if (localPart === domain.split('.')[0]) return true;
  if (/^(.)\1+$/.test(localPart)) return true;
  if (/^\d+$/.test(localPart)) return true;
  if (localPart.length <= 3 && domain.split('.')[0].length <= 3) return true;

  return false;
}

export function validateEmailForWaitlist(email) {
  const normalized = normalizeEmail(email);

  if (!normalized) {
    return { ok: false, message: 'Please enter an email address.' };
  }

  if (!isValidEmailSyntax(normalized)) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }

  if (isPlaceholderEmail(normalized)) {
    return { ok: false, message: 'Please use a real email address.' };
  }

  if (isDisposableEmail(normalized)) {
    return { ok: false, message: 'Disposable or temporary email addresses are not allowed.' };
  }

  return { ok: true, email: normalized };
}

export function maskEmail(email) {
  const normalized = normalizeEmail(email);
  const parts = normalized.split('@');
  if (parts.length !== 2) return normalized;

  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length <= 2 ? `${name[0]}***` : `${name.slice(0, 2)}***${name.slice(-1)}`;
  return `${maskedName}@${domain}`;
}

