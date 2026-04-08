export const formatTime = (time: unknown): string => {
  if (!time) return "No time";

  if (typeof time === "string") {
    return new Date(time).toLocaleString();
  }

  const t = time as { seconds?: number };
  if (t.seconds !== undefined) {
    return new Date(t.seconds * 1000).toLocaleString();
  }

  return "No time";
};
