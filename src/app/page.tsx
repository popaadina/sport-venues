import VenuesPageClient from "@/components/venues/venues-page-client";
import { getVenues } from "@/lib/venues";

export default async function Home() {
  const venues = await getVenues();
  return <VenuesPageClient venues={venues} />;
}
