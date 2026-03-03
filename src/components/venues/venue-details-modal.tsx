"use client";

import type { Venue } from "@/lib/venues";

type Props = {
  venue: Venue;
  onClose: () => void;
};

export default function VenueDetailsModal({ venue, onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xl font-semibold">{venue.name}</div>
            <div className="mt-1 text-sm text-foreground/70">
              {[venue.addressLine1, venue.addressLine2].filter(Boolean).join(", ")}
            </div>
          </div>

          <button
            type="button"
            className="h-9 w-9 rounded-md border border-black/10 text-lg"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          {venue.tag ? (
            <div>
              <span className="text-foreground/70">Type: </span>
              <span className="font-medium">{venue.tag}</span>
            </div>
          ) : null}

          {venue.phone ? (
            <div>
              <span className="text-foreground/70">Phone: </span>
              <span className="font-medium">{venue.phone}</span>
            </div>
          ) : null}

          {venue.homepage ? (
            <div>
              <span className="text-foreground/70">Website: </span>
              <a
                className="font-medium underline"
                href={
                  venue.homepage.startsWith("http")
                    ? venue.homepage
                    : `https://${venue.homepage}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {venue.homepage}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
