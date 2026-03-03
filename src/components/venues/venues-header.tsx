export default function VenuesHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="flex h-16 w-full items-center gap-10 px-6">
        <div className="flex flex-col leading-none">
          <div className="text-sm font-semibold tracking-tight">
            BEDRIJFSFITNESS
          </div>
          <div className="mt-1 text-[11px] font-semibold tracking-tight text-foreground/60">
            NEDERLAND
          </div>
        </div>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <a className="border-b-2 border-black pb-1" href="#">
            Sport Venues
          </a>
          <a className="text-foreground/70" href="#">
            About us
          </a>
          <a className="text-foreground/70" href="#">
            Sign-up
          </a>
        </nav>
      </div>
    </header>
  );
}
