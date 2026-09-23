import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { imageFor, inr } from "@/lib/epooja";

export type Pooja = {
  id: string;
  slug: string;
  name: string;
  sanskrit_name: string | null;
  category: string;
  description: string;
  duration_minutes: number;
  base_price: number;
  items_price: number;
};

export function PoojaCard({ pooja }: { pooja: Pooja }) {
  return (
    <div className="glass-panel flex flex-col rounded-2xl p-6 transition-colors hover:border-primary/40">
      <p className="label-mono">{pooja.category}</p>
      <h3 className="mt-2 text-2xl">{pooja.name}</h3>
      {pooja.sanskrit_name && (
        <p className="text-sm text-primary/80">{pooja.sanskrit_name}</p>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {pooja.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
        <div>
          <p className="font-mono text-xs text-muted-foreground">
            <Clock className="mr-1 inline size-3" />
            {pooja.duration_minutes} min
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {inr(Number(pooja.base_price))}
            <span className="ml-1 text-xs font-normal text-muted-foreground">onwards</span>
          </p>
        </div>
        <Button asChild variant="brass" size="sm">
          <Link to="/book" search={{ pooja: pooja.slug }}>
            Book
          </Link>
        </Button>
      </div>
    </div>
  );
}

export type Priest = {
  id: string;
  full_name: string;
  title: string;
  bio: string;
  experience_years: number;
  languages: string[];
  specialities: string[];
  city: string;
  photo_key: string | null;
  rating: number;
  reviews_count: number;
};

export function PriestCard({ priest, distance }: { priest: Priest; distance?: number }) {
  return (
    <div className="glass-panel flex gap-4 rounded-2xl p-5">
      <img
        src={imageFor(priest.photo_key)}
        alt={priest.full_name}
        loading="lazy"
        width={512}
        height={512}
        className="size-20 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg leading-tight">{priest.full_name}</h3>
            <p className="text-xs text-muted-foreground">
              {priest.title} · {priest.experience_years} yrs
            </p>
          </div>
          <span className="flex items-center gap-1 font-mono text-xs text-primary">
            <Star className="size-3 fill-current" />
            {Number(priest.rating).toFixed(1)}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{priest.bio}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {priest.specialities.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] text-muted-foreground">
          <MapPin className="mr-1 inline size-3" />
          {priest.city}
          {distance !== undefined && ` · ${distance.toFixed(1)} km away`} ·{" "}
          {priest.languages.join(", ")}
        </p>
      </div>
    </div>
  );
}
