"use client";

import { useMemo, useState } from "react";
import GoogleMap from "@/components/map/google-map";
import VenueDetailsModal from "@/components/venues/venue-details-modal";
import VenueCard from "@/components/venues/venue-card";
import VenuesFilters from "@/components/venues/venues-filters";
import VenuesHeader from "@/components/venues/venues-header";
import ViewModeToggle from "@/components/venues/view-mode-toggle";
import type { Venue } from "@/lib/venues";

type Props = {
  venues: Venue[];
};

function normalize(value: string | null | undefined): string {
  return (value ?? "").trim();
}

function getUniqueOptions(
  venues: Venue[],
  pick: (venue: Venue) => string | null | undefined
): string[] {
  const unique = new Set<string>();
  for (const venue of venues) {
    const value = normalize(pick(venue));
    if (value) unique.add(value);
  }
  return Array.from(unique).sort((a, b) => a.localeCompare(b));
}

function matchesFilters(venue: Venue, city: string, tag: string): boolean {
  const venueCity = normalize(venue.city);
  const venueTag = normalize(venue.tag);

  if (city && venueCity !== city) return false;
  if (tag && venueTag !== tag) return false;
  return true;
}

export default function VenuesPageClient({ venues }: Props) {
  const [city, setCity] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSelectVenueId = (venueId: number) => {
    const venue = venues.find((v) => v.id === venueId) ?? null;
    setSelectedVenueId(venueId);
    setSelectedVenue(venue);
  };

  const handleOpenVenueDetails = (venue: Venue) => {
    setSelectedVenueId(venue.id);
    setSelectedVenue(venue);
  };

  const handleViewLocation = (venue: Venue) => {
    setSelectedVenueId(venue.id);
    setSelectedVenue(venue);
  };

  const cityOptions = useMemo(
    () => getUniqueOptions(venues, (v) => v.city),
    [venues]
  );

  const tagOptions = useMemo(
    () => getUniqueOptions(venues, (v) => v.tag),
    [venues]
  );

  const filtered = useMemo(
    () => venues.filter((venue) => matchesFilters(venue, city, tag)),
    [venues, city, tag]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <VenuesHeader />

      <div className="w-full">
        <VenuesFilters
          city={city}
          tag={tag}
          cityOptions={cityOptions}
          tagOptions={tagOptions}
          onChangeCity={setCity}
          onChangeTag={setTag}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="mx-6 rounded-lg bg-white shadow-sm shadow-black/5 lg:ml-6 lg:mr-0">
            <div className="flex items-center justify-between px-2 py-1.5">
              <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
            </div>

            <div className="h-[70vh] overflow-auto p-2">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {filtered.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      variant="grid"
                      onSelect={handleOpenVenueDetails}
                      onViewLocation={handleViewLocation}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filtered.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      variant="list"
                      onSelect={handleOpenVenueDetails}
                      onViewLocation={handleViewLocation}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="h-[75vh]">
            <GoogleMap
              venues={filtered}
              selectedVenueId={selectedVenueId}
              onSelectVenueId={handleSelectVenueId}
            />
          </section>
        </div>
      </div>

        {selectedVenue ? (
          <VenueDetailsModal
            venue={selectedVenue}
            onClose={() => setSelectedVenue(null)}
          />
        ) : null}
    </div>
  );
}
