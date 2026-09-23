import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="ritual-gradient flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
              ॐ
            </span>
            <span className="font-display text-xl">Aura ePooja</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Verified Vedic priests, auspicious timings and transparent pricing — book poojas,
            homas and online consultations at your home.
          </p>
        </div>
        <div>
          <p className="label-mono">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/poojas">Poojas & Homas</Link>
            <Link to="/priests">Our priests</Link>
            <Link to="/panchang">Daily Panchang</Link>
            <Link to="/festivals">Festivals</Link>
          </div>
        </div>
        <div>
          <p className="label-mono">Support</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/contact">Contact us</Link>
            <Link to="/priest-enrolment">Enrol as a priest</Link>
            <Link to="/auth">Sign in</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aura ePooja. Serving Bengaluru with devotion.
      </div>
    </footer>
  );
}
