type Gtag = (command: string, eventName: string, eventParams?: Record<string, string>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackWaitlistSignup() {
  if (typeof window !== 'undefined') {
    window.gtag?.('event', 'waitlist_signup', {
      source: 'website',
    });
  }
}

export {};
