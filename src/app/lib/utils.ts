const LOCAL_STORAGE_KEY = "catwisdom.liked.wisdoms";

export function getReadableLikesCount(likes: number): string {
  if (likes < 1_000) return likes.toString();
  if (likes < 1_000_000) return (likes / 1_000).toFixed(1) + "K";
  if (likes < 1_000_000_000) return (likes / 1_000_000).toFixed(1) + "M";
  return (likes / 1_000_000_000).toFixed(1) + "B";
}

export function getLikedIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function updateLikedIds(wisdomId: number, liked: boolean) {
  const current = getLikedIds();
  const updated = liked
    ? [...new Set([...current, wisdomId])]
    : current.filter((id) => id !== wisdomId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}
