export function getReadableLikesCount(likes: number): string {
  if (likes < 1_000) return likes.toString();
  if (likes < 1_000_000) return (likes / 1_000).toFixed(1) + "K";
  if (likes < 1_000_000_000) return (likes / 1_000_000).toFixed(1) + "M";
  return (likes / 1_000_000_000).toFixed(1) + "B";
}
