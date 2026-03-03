"use client";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import type { Venue } from "@/lib/venues";

const GRAY_STYLES: google.maps.MapTypeStyle[] = [
  { stylers: [{ saturation: -100 }, { lightness: 20 }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
];

type Props = {
  venues: Venue[];
  selectedVenueId: number | null;
  onSelectVenueId: (venueId: number) => void;
};

export default function GoogleMap({
  venues,
  selectedVenueId,
  onSelectVenueId,
}: Props) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<Map<number, google.maps.Marker>>(new Map());
  const onSelectVenueIdRef = useRef(onSelectVenueId);
  const [loadError, setLoadError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? null;

  useEffect(() => {
    onSelectVenueIdRef.current = onSelectVenueId;
  }, [onSelectVenueId]);

  useEffect(() => {
    let isCancelled = false;

    async function init() {
      if (!mapDivRef.current) return;
      if (!apiKey) return;
      if (map) return;

      setOptions({
        key: apiKey,
        v: "weekly",
        language: "en",
      });

      try {
        await importLibrary("maps");
      } catch (err) {
        if (!isCancelled) {
          setLoadError(
            err instanceof Error
              ? err.message
              : "Failed to load Google Maps library"
          );
        }
        return;
      }
      if (isCancelled) return;

      const initialCenter = { lat: 52.1326, lng: 5.2913 }; 

      const createdMap = new google.maps.Map(mapDivRef.current, {
        center: initialCenter,
        zoom: 7,
        disableDefaultUI: true,
        clickableIcons: false,
        keyboardShortcuts: false,
        zoomControl: true,
        controlSize: 28,
        styles: GRAY_STYLES,
      });

      setMap(createdMap);
    }

    init();

    return () => {
      isCancelled = true;
    };
  }, [apiKey, map]);

  useEffect(() => {
    if (!map) return;

    for (const marker of markersRef.current.values()) {
      marker.setMap(null);
    }
    markersRef.current.clear();

    const bounds = new google.maps.LatLngBounds();

    for (const venue of venues) {
      const marker = new google.maps.Marker({
        position: { lat: venue.latitude, lng: venue.longitude },
        map,
        title: venue.name,
      });

      marker.addListener("click", () => onSelectVenueIdRef.current(venue.id));
      markersRef.current.set(venue.id, marker);

      bounds.extend(marker.getPosition()!);
    }

    if (venues.length > 1) {
      map.fitBounds(bounds, 40);
    } else if (venues.length === 1) {
      map.setCenter({ lat: venues[0].latitude, lng: venues[0].longitude });
      map.setZoom(14);
    }
  }, [map, venues]);

  useEffect(() => {
    if (!map) return;

    if (selectedVenueId == null) return;

    const marker = markersRef.current.get(selectedVenueId);
    if (!marker) return;

    const pos = marker.getPosition();
    if (!pos) return;

    map.panTo(pos);
    map.setZoom(14);
  }, [map, selectedVenueId]);

  if (loadError) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg border border-black/10 bg-white p-4 text-center text-sm text-foreground/70">
        Google Maps failed to load: <span className="font-medium">{loadError}</span>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <div ref={mapDivRef} className="h-full w-full" />
    </div>
  );
}
