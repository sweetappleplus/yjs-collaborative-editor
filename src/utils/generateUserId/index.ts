export function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
