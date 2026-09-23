import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarHeart, ShieldCheck, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PanchangStrip } from "@/components/site/PanchangStrip";
import { PoojaCard, PriestCard, type Pooja, type Priest } from "@/components/site/cards";
import { heroImage, imageFor, prettyDate, todayISO } from "@/lib/epooja";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura ePooja — Book Verified Vedic Priests in Bengaluru" },
      {
        name: "description",
        content:
          "Book poojas, homas and online consultations with verified Vedic priests at auspicious muhurats. Transparent pricing, priest at your doorstep.",
      },
      { property: "og:title", content: "Aura ePooja — Book Verified Vedic Priests" },
      {
        property: "og:description",
        content:
          "Poojas, homas and online consultations with verified priests at auspicious muhurats.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: poojas } = useQuery({
    queryKey: ["poojas", "home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poojas")
        .select("*")
        .eq("active", true)
        .order("base_price")
        .limit(6);
      if (error) throw error;
      return data as Pooja[];
    },
  });

  const { data: priests } = useQuery({
    queryKey: ["priests", "home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("priests")
        .select("*")
        .eq("status", "approved")
        .limit(3);
      if (error) throw error;
      return data as unknown as Priest[];
    },
  });

  const { data: festivals } = useQuery({
    queryKey: ["festivals", "home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("festivals")
        .select("*")
        .gte("festival_date", todayISO())
        .order("festival_date")
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  const { data: gallery } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="label-mono">Bengaluru · Vedic priest marketplace</p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">
              Book a blessing in <span className="text-ritual">sacred time</span>.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Choose your pooja, pick an auspicious muhurat, and we bring a verified priest —
              with or without samagri — to your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ritual" size="xl">
                <Link to="/book">Start booking</Link>
              </Button>
              <Button asChild variant="quiet" size="xl">
                <Link to="/priests">Meet the priests</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> Aadhaar-verified priests
              </span>
              <span className="flex items-center gap-2">
                <CalendarHeart className="size-4 text-primary" /> Muhurat-aware scheduling
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" /> Samagri included option
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="glow-ring overflow-hidden rounded-3xl border border-border">
              <img
                src={heroImage}
                alt="Lit brass diya glowing in the dark"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Panchang */}
      <section className="mx-auto max-w-6xl px-4">
        <PanchangStrip />
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="label-mono">Offerings</p>
            <h2 className="mt-2 text-4xl">Poojas, homas & consultations</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/poojas">View all</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(poojas ?? []).map((p) => (
            <PoojaCard key={p.id} pooja={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <p className="label-mono">How it works</p>
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {[
            ["01", "Choose your pooja", "Pick a ritual or an online consultation."],
            ["02", "Pick date & muhurat", "We surface auspicious windows for your date."],
            ["03", "Share your location", "We find priests serving within 15 km."],
            ["04", "Compare & confirm", "Compare priests, pay securely, get confirmation."],
          ].map(([n, title, body]) => (
            <div key={n} className="glass-panel rounded-2xl p-6">
              <p className="font-mono text-sm text-primary">{n}</p>
              <h3 className="mt-3 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Priests */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="label-mono">Verified priests</p>
            <h2 className="mt-2 text-4xl">Guided by experienced hands</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/priests">All priests</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {(priests ?? []).map((p) => (
            <PriestCard key={p.id} priest={p} />
          ))}
        </div>
      </section>

      {/* Festivals */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <p className="label-mono">Upcoming festivals</p>
        <h2 className="mt-2 text-4xl">Plan the year's auspicious days</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {(festivals ?? []).map((f) => (
            <div key={f.id} className="glass-panel rounded-2xl p-5">
              <p className="font-mono text-xs text-primary">{prettyDate(f.festival_date)}</p>
              <h3 className="mt-2 text-xl">{f.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              {f.suggested_pooja && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Suggested: <span className="text-foreground">{f.suggested_pooja}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <p className="label-mono">Gallery</p>
        <h2 className="mt-2 text-4xl">Moments from our rituals</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(gallery ?? []).map((g) => (
            <figure key={g.id} className="overflow-hidden rounded-2xl border border-border">
              <img
                src={imageFor(g.image_key)}
                alt={g.title}
                loading="lazy"
                width={768}
                height={768}
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="glass-panel rounded-3xl p-10 text-center">
          <p className="label-mono">About Aura ePooja</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-4xl">
            Traditional rituals, organised with modern care
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We verify every priest's identity and experience, publish transparent prices for
            pooja-only and pooja-with-samagri variants, and keep you informed from booking to
            completion.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild variant="ritual" size="lg">
              <Link to="/book">Book a pooja</Link>
            </Button>
            <Button asChild variant="quiet" size="lg">
              <Link to="/priest-enrolment">Enrol as a priest</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
