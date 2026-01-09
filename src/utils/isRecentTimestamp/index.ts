export function isRecentTimestamp(timestamp: number): boolean {
  return Date.now() - timestamp < 5000;
}
