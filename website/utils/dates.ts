/**
 * Format date: "DD month YYYY"
 * @example "15 mai 2024"
 */
export function formatDate(date: Date | string) {
  return Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
    new Date(date),
  );
}

/**
 * 1. entre la date locale et l'envoie à l'api (12:33)
 * 2. api renvoie la date ISO (10:33)
 * 3. front transforme la date ISO en locale dans le champ (12:33)
 * 4. front transforme la date local en ISO et l'envoie à l'api (10:33)
 *
 * Date API (reçue et envoyée)
 *  = ISO string
 *  = "2024-05-15T10:33:00.000Z"
 *
 * Date Front (champs)
 *  = Locale string
 *  = "2024-05-15-12:33"
 *
 * Date Front formattée
 *  = String
 *  = 15 mai 2024 à 12h33
 */

/**
 * Transform an ISO date string into a YYYY-MM-DD-HH-MM string
 * "2024-05-15T10:33:00.000Z" => "2024-05-15-12:33"
 */
export function toLocalDateString(ISODateString: string) {
  const localDate = new Date(ISODateString);

  const date = ISODateString.split("T")[0];
  const time = localDate.toTimeString().slice(0, 5);

  return `${date}-${time}`;
}
