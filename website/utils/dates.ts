/**
 * Format date: "DD month YYYY"
 * @example "15 mai 2024"
 */
export function formatDate(date: Date) {
  return Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
    new Date(date),
  );
}
