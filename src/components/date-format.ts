export const formatDate = (dateInput?: string | Date) => {
  if (!dateInput) return "";
  const date =
    typeof dateInput === "string"
      ? new Date(dateInput.replace(" ", "T") + "Z")
      : dateInput;

  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours > 24) {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
