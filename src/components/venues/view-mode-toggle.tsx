type Props = {
  viewMode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
};

export default function ViewModeToggle({ viewMode, onChange }: Props) {
  return (
    <div className="inline-flex items-center rounded-md bg-black/10 p-0.5">
      <button
        type="button"
        className={`grid h-5 w-6 place-items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/30 ${
          viewMode === "grid"
            ? "bg-white shadow-sm shadow-black/10"
            : "bg-transparent hover:bg-white/60"
        }`}
        aria-label="Grid view"
        aria-pressed={viewMode === "grid"}
        onClick={() => onChange("grid")}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-3 w-4 origin-center scale-x-110 text-foreground/70"
        >
          <path
            d="M4 4h5v5H4V4Zm7 0h5v5h-5V4ZM4 11h5v5H4v-5Zm7 0h5v5h-5v-5Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <button
        type="button"
        className={`grid h-5 w-6 place-items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/30 ${
          viewMode === "list"
            ? "bg-white shadow-sm shadow-black/10"
            : "bg-transparent hover:bg-white/60"
        }`}
        aria-label="List view"
        aria-pressed={viewMode === "list"}
        onClick={() => onChange("list")}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-3 w-4 origin-center scale-x-110 text-foreground/70"
        >
          <path
            d="M4 6h12v1.5H4V6Zm0 4h12v1.5H4V10Zm0 4h12v1.5H4V14Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
