export function formatDate(dateTime: string): string {
  if (!dateTime) {
    return "";
  }
  const date = new Date(dateTime);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
