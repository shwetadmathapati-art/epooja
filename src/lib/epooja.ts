import heroDiya from "@/Assets/hero-diya.jpg";
import priest1 from "@/Assets/priest-1.jpg";
import priest2 from "@/Assets/priest-2.jpg";
import priest3 from "@/Assets/priest-3.jpg";
import gallery1 from "@/Assets/gallery-1.jpg";
import gallery2 from "@/Assets/gallery-2.jpg";
import gallery3 from "@/Assets/gallery-3.jpg";
import gallery4 from "@/Assets/gallery-4.jpg";

export const imageMap: Record<string, string> = {
  hero: heroDiya,
  p1: priest1,
  p2: priest2,
  p3: priest3,
  g1: gallery1,
  g2: gallery2,
  g3: gallery3,
  g4: gallery4,
};

export const heroImage = heroDiya;

export function imageFor(key?: string | null) {
  return (key && imageMap[key]) || priest1;
}

export const inr = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const prettyDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const shortDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

export const todayISO = () => new Date().toISOString().slice(0, 10);

/** Great-circle distance in km. */
export function distanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export const statusLabel: Record<string, string> = {
  pending_payment: "Payment pending",
  awaiting_confirmation: "Awaiting priest",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

/** Bengaluru localities used for location selection in the booking flow. */
export const localities = [
  { name: "Indiranagar", lat: 12.9784, lng: 77.6408 },
  { name: "Jayanagar", lat: 12.9299, lng: 77.5826 },
  { name: "Koramangala", lat: 12.9352, lng: 77.6245 },
  { name: "JP Nagar", lat: 12.9063, lng: 77.5857 },
  { name: "Whitefield", lat: 12.9698, lng: 77.7499 },
  { name: "Malleshwaram", lat: 13.0035, lng: 77.5709 },
  { name: "BTM Layout", lat: 12.9166, lng: 77.6101 },
  { name: "Hebbal", lat: 13.0358, lng: 77.597 },
];
