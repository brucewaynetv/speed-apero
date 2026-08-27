import type { OpeningHour } from "@/lib/data/catalog";

export type RestaurantStatusType = "open" | "closed" | "opening_soon";

export interface RestaurantStatusResult {
  status: RestaurantStatusType;
  label: string;
  nextChange?: string;
}

const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":");
  return `${h}h${m === "00" ? "00" : m}`;
}

export function getRestaurantStatus(
  hours: Pick<OpeningHour, "dayOfWeek" | "openTime" | "closeTime">[],
  now: Date = new Date()
): RestaurantStatusResult {
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todaySlots = hours.filter((h) => h.dayOfWeek === day);

  for (const slot of todaySlots) {
    const open = parseTime(slot.openTime);
    let close = parseTime(slot.closeTime);
    if (close === 0) close = 24 * 60;

    if (currentMinutes >= open && currentMinutes < close) {
      return { status: "open", label: "OUVERT" };
    }

    if (currentMinutes < open && open - currentMinutes <= 60) {
      return {
        status: "opening_soon",
        label: `OUVRE À ${formatTime(slot.openTime).toUpperCase()}`,
        nextChange: slot.openTime,
      };
    }
  }

  for (let offset = 0; offset <= 7; offset++) {
    const checkDay = (day + offset) % 7;
    const slots = hours
      .filter((h) => h.dayOfWeek === checkDay)
      .sort((a, b) => parseTime(a.openTime) - parseTime(b.openTime));

    for (const slot of slots) {
      if (offset === 0 && parseTime(slot.openTime) <= currentMinutes) continue;
      const dayLabel = offset === 0 ? "AUJOURD'HUI" : DAY_NAMES[checkDay].toUpperCase();
      return {
        status: "closed",
        label: offset === 0 ? "FERMÉ" : "FERMÉ",
        nextChange: `${dayLabel} ${formatTime(slot.openTime)}`,
      };
    }
  }

  return { status: "closed", label: "FERMÉ" };
}
