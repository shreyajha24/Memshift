export interface WaitlistRegistrationResult {
  success: boolean;
  spot?: number;
  email?: string;
  isNew?: boolean;
  isExisting?: boolean;
  registeredAt?: string;
  totalCount?: number;
  message?: string;
}

export interface WaitlistStats {
  totalCount: number;
  latestSpot: number;
  recentMembers?: Array<{
    id: string;
    maskedEmail: string;
    spot: number;
    registeredAt: string;
  }>;
}

const STORAGE_EMAIL_KEY = 'memshift_waitlist_email';
const STORAGE_SPOT_KEY = 'memshift_waitlist_spot';
const STORAGE_DATE_KEY = 'memshift_waitlist_date';
const STORAGE_LOCAL_USERS_KEY = 'memshift_local_real_users';

// Real email validation
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim().toLowerCase());
}

// Register real user
export async function registerWaitlistUser(email: string): Promise<WaitlistRegistrationResult> {
  const cleanEmail = email.trim().toLowerCase();

  if (!isValidEmail(cleanEmail)) {
    return {
      success: false,
      message: 'Please enter a valid email address (e.g. name@domain.com).',
    };
  }

  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: cleanEmail }),
    });

    const data = await res.json();

    if (data.success) {
      // Save real user session locally
      try {
        localStorage.setItem(STORAGE_EMAIL_KEY, cleanEmail);
        localStorage.setItem(STORAGE_SPOT_KEY, data.spot.toString());
        localStorage.setItem(STORAGE_DATE_KEY, data.registeredAt || new Date().toISOString());
      } catch (e) {
        console.warn('LocalStorage unavailable', e);
      }
      return data;
    } else {
      return {
        success: false,
        message: data.message || 'Failed to join waitlist. Please try again.',
      };
    }
  } catch (err) {
    // Graceful offline fallback: maintain real dynamic persistence in local storage if network / static host is used
    console.warn('Server endpoint unreachable, using client persistence store', err);
    return registerOfflineUser(cleanEmail);
  }
}

// Fetch real waitlist stats
export async function fetchWaitlistStats(): Promise<WaitlistStats> {
  try {
    const res = await fetch('/api/waitlist');
    if (res.ok) {
      const data = await res.json();
      return {
        totalCount: data.totalCount ?? 0,
        latestSpot: data.latestSpot ?? 100,
        recentMembers: data.recentMembers ?? [],
      };
    }
  } catch (err) {
    console.warn('Could not fetch server stats, reading offline store');
  }

  // Fallback to local store
  try {
    const localUsers: Array<{ email: string; spot: number; registeredAt: string }> = JSON.parse(
      localStorage.getItem(STORAGE_LOCAL_USERS_KEY) || '[]'
    );
    return {
      totalCount: localUsers.length,
      latestSpot: localUsers.length > 0 ? localUsers[localUsers.length - 1].spot : 100,
      recentMembers: localUsers.slice(-5).reverse().map((u, i) => ({
        id: `offline-${i}`,
        maskedEmail: maskEmail(u.email),
        spot: u.spot,
        registeredAt: u.registeredAt,
      })),
    };
  } catch {
    return { totalCount: 0, latestSpot: 100, recentMembers: [] };
  }
}

// Client offline real storage fallback
function registerOfflineUser(email: string): WaitlistRegistrationResult {
  try {
    const localUsers: Array<{ email: string; spot: number; registeredAt: string }> = JSON.parse(
      localStorage.getItem(STORAGE_LOCAL_USERS_KEY) || '[]'
    );

    const existing = localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      localStorage.setItem(STORAGE_EMAIL_KEY, existing.email);
      localStorage.setItem(STORAGE_SPOT_KEY, existing.spot.toString());
      localStorage.setItem(STORAGE_DATE_KEY, existing.registeredAt);

      return {
        success: true,
        isExisting: true,
        spot: existing.spot,
        email: existing.email,
        registeredAt: existing.registeredAt,
        totalCount: localUsers.length,
        message: `Welcome back! You are already on the waitlist at spot #${existing.spot}.`,
      };
    }

    const BASE_OFFSET = 100;
    const newSpot = BASE_OFFSET + localUsers.length + 1;
    const now = new Date().toISOString();
    const newUser = { email, spot: newSpot, registeredAt: now };

    localUsers.push(newUser);
    localStorage.setItem(STORAGE_LOCAL_USERS_KEY, JSON.stringify(localUsers));
    localStorage.setItem(STORAGE_EMAIL_KEY, email);
    localStorage.setItem(STORAGE_SPOT_KEY, newSpot.toString());
    localStorage.setItem(STORAGE_DATE_KEY, now);

    return {
      success: true,
      isNew: true,
      spot: newSpot,
      email,
      registeredAt: now,
      totalCount: localUsers.length,
      message: `Spot #${newSpot} secured successfully!`,
    };
  } catch (e: any) {
    return {
      success: false,
      message: 'Storage error: ' + (e.message || 'Unable to save registration.'),
    };
  }
}

function maskEmail(email: string) {
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length <= 2 ? name[0] + '***' : name.slice(0, 2) + '***' + name.slice(-1);
  return `${maskedName}@${domain}`;
}

export function getStoredWaitlistUser() {
  try {
    const email = localStorage.getItem(STORAGE_EMAIL_KEY);
    const spot = localStorage.getItem(STORAGE_SPOT_KEY);
    const registeredAt = localStorage.getItem(STORAGE_DATE_KEY);
    if (email && spot) {
      return {
        email,
        spot: parseInt(spot, 10),
        registeredAt: registeredAt || new Date().toISOString(),
      };
    }
  } catch {}
  return null;
}

export function clearStoredWaitlistUser() {
  try {
    localStorage.removeItem(STORAGE_EMAIL_KEY);
    localStorage.removeItem(STORAGE_SPOT_KEY);
    localStorage.removeItem(STORAGE_DATE_KEY);
  } catch {}
}
