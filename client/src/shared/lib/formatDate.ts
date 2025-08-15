export const formatTime = (date: Date | string): string => {
  const d = new Date(date);

  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
