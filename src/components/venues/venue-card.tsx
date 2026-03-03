import Image from "next/image";
import type { Venue } from "@/lib/venues";

type Props = {
  venue: Venue;
  variant: "grid" | "list";
  onSelect: (venue: Venue) => void;
  onViewLocation: (venue: Venue) => void;
};

export default function VenueCard({ venue, variant, onSelect, onViewLocation }: Props) {
  if (variant === "list") {
    return (
      <button
        type="button"
        onClick={() => onSelect(venue)}
        className="group rounded-md bg-white text-left shadow-sm shadow-black/5"
      >
        <div className="flex gap-3 p-2">
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md bg-black/5">
            {venue.mainPhotoUri ? (
              <Image
                src={venue.mainPhotoUri}
                alt={venue.name}
                fill
                className="object-cover"
                sizes="128px"
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1 py-1">
            <div className="text-xs font-semibold leading-5 group-hover:underline">
              {venue.name}
            </div>
            <div className="mt-1 text-[10px] text-foreground/50">
              {[venue.addressLine1, venue.addressLine2].filter(Boolean).join(", ")}
            </div>

            <div
              className="mt-3 inline-flex items-center bg-sky-600 px-6 py-1 text-[10px] font-semibold text-white"
              style={{
                clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onViewLocation(venue);
              }}
            >
              <span>view location</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="ml-2 h-3 w-3"
              >
                <path
                  d="M4 10h10m0 0-3-3m3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(venue)}
      className="group rounded-md bg-white text-left shadow-sm shadow-black/5"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-black/5">
        {venue.mainPhotoUri ? (
          <Image
            src={venue.mainPhotoUri}
            alt={venue.name}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 20vw, 100vw"
          />
        ) : null}
      </div>

      <div className="py-2">
        <div className="text-xs font-semibold leading-5 group-hover:underline">
          {venue.name}
        </div>
        <div className="mt-1 text-[10px] text-foreground/50">
          {[venue.addressLine1, venue.addressLine2].filter(Boolean).join(", ")}
        </div>

        <div
          className="mt-3 inline-flex items-center bg-sky-600 px-6 py-1 text-[10px] font-semibold text-white"
          style={{
            clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onViewLocation(venue);
          }}
        >
          <span>view location</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="ml-2 h-3 w-3"
          >
            <path
              d="M4 10h10m0 0-3-3m3 3-3 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
