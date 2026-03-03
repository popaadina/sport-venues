export type Venue = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  addressLine1?: string | null;
  addressLine2?: string | null;
  phone?: string | null;
  homepage?: string | null;
  mainPhotoUri?: string | null;
  tag?: string | null;
  city?: string | null;
};

type RawVenue = Omit<Venue, "city"> & Record<string, unknown>;

function extractCity(addressLine2?: string | null): string | null {
  if (!addressLine2) return null;

  const trimmed = addressLine2.trim();

  const match = /^\d{4}\s*[A-Za-z]{2}\s+(.*)$/.exec(trimmed);
  if (match?.[1]) return match[1].trim();

  return trimmed.split(/\s+/).pop() ?? trimmed;
}

export async function getVenues(): Promise<Venue[]> {
  const response = await fetch("https://workit.nl/files/merchants.json", {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch venues (${response.status})`);
  }

  const raw = (await response.json()) as RawVenue[];

  return raw
    .filter((v) => typeof v.latitude === "number" && typeof v.longitude === "number")
    .map((v) => {
      const venue: Venue = {
        id: v.id,
        name: v.name,
        latitude: v.latitude,
        longitude: v.longitude,
        addressLine1: v.addressLine1 ?? null,
        addressLine2: v.addressLine2 ?? null,
        phone: v.phone ?? null,
        homepage: v.homepage ?? null,
        mainPhotoUri: v.mainPhotoUri ?? null,
        tag: v.tag ?? null,
        city: extractCity(v.addressLine2),
      };

      return venue;
    });
}
