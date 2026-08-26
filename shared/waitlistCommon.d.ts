export declare function normalizeEmail(email: string): string;
export declare function isValidEmailSyntax(email: string): boolean;
export declare function isDisposableEmail(email: string): boolean;
export declare function isPlaceholderEmail(email: string): boolean;
export declare function validateEmailForWaitlist(
  email: string
): { ok: true; email: string } | { ok: false; message: string };
export declare function maskEmail(email: string): string;

