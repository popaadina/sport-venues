type Props = {
  city: string;
  tag: string;
  cityOptions: string[];
  tagOptions: string[];
  onChangeCity: (city: string) => void;
  onChangeTag: (tag: string) => void;
};

export default function VenuesFilters({
  city,
  tag,
  cityOptions,
  tagOptions,
  onChangeCity,
  onChangeTag,
}: Props) {
  return (
    <div className="border-b border-black/20 px-6 py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex w-full flex-col gap-1 sm:w-40">
          <span className="sr-only">Filter on city</span>
          <div className="relative">
            <select
              className={`h-8 w-full appearance-none rounded-md border border-black/10 bg-white px-3 pr-10 ${
                city ? "text-sm text-foreground" : "text-xs text-foreground/60"
              }`}
              value={city}
              onChange={(e) => onChangeCity(e.target.value)}
            >
              <option value="">Filter on city</option>
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
            >
              <path
                fillRule="evenodd"
                d="M10 4a.75.75 0 0 1 .75.75v9.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V4.75A.75.75 0 0 1 10 4Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </label>

        <label className="flex w-full flex-col gap-1 sm:w-40">
          <span className="sr-only">Filter on type</span>
          <div className="relative">
            <select
              className={`h-8 w-full appearance-none rounded-md border border-black/10 bg-white px-3 pr-10 ${
                tag ? "text-sm text-foreground" : "text-xs text-foreground/60"
              }`}
              value={tag}
              onChange={(e) => onChangeTag(e.target.value)}
            >
              <option value="">Filter on type</option>
              {tagOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
            >
              <path
                fillRule="evenodd"
                d="M10 4a.75.75 0 0 1 .75.75v9.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V4.75A.75.75 0 0 1 10 4Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </label>
      </div>
    </div>
  );
}
