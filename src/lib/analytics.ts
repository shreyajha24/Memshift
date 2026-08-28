type Gtag = (command: string, eventName: string, eventParams?: Record<string, string>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackBetaDownload(source: string) {
  if (typeof window !== 'undefined') {
    window.gtag?.('event', 'beta_download', {
      source,
    });
  }
}

export {};
