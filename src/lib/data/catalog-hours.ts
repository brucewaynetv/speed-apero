export interface OpeningHour {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

/** Horaires Speed Apéro Cavillargues */
export const OPENING_HOURS: OpeningHour[] = [
  { dayOfWeek: 1, openTime: "18:00", closeTime: "23:00" },
  { dayOfWeek: 2, openTime: "18:00", closeTime: "23:00" },
  { dayOfWeek: 3, openTime: "18:00", closeTime: "23:00" },
  { dayOfWeek: 4, openTime: "18:00", closeTime: "23:00" },
  { dayOfWeek: 5, openTime: "18:00", closeTime: "00:00" },
  { dayOfWeek: 6, openTime: "18:00", closeTime: "00:00" },
  { dayOfWeek: 0, openTime: "18:00", closeTime: "00:00" },
];
