export function randomEmail(prefix = "pw-user"): string {
  return `${prefix}-${Date.now()}@example.com`;
}
