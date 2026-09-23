import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PriestCard, type Priest } from "@/Components/site/cards";
import { Button } from "@/Components/UI/button";

export const Route = createFileRoute("/priests")({
  head: () => ({
    meta: [
      { title: "Verified Vedic Priests in Bengaluru — Aura ePooja" },
      {
        name: "description",
        content:
          "Meet Aadhaar-verified Vedic priests with ratings, languages, specialities and service areas across Bengaluru.",
      },
      { property: "og:title", content: "Verified Vedic Priests — Aura ePooja" },
      {
        property: "og:description",
        content: "Ratings, languages, specialities and service radius for every priest.",
      },
    ],
  }),
  component: PriestsPage,
});

function PriestsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["priests", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("priests")
        .select("*")
        .eq("status", "approved")
        .order("rating", { ascending: false });
      if (error) throw error;
      return data as unknown as Priest[];
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="label-mono">Our panel</p>
      <h1 className="mt-2 text-5xl">Verified priests</h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground">
        Every priest is identity-verified and reviewed by the families they have served. Each
        serves bookings within a 15 km radius of their base area.
      </p>

      {isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading priests…</p>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {(data ?? []).map((p) => (
            <PriestCard key={p.id} priest={p} />
          ))}
        </div>
      )}

      <div className="glass-panel mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-8">
        <div>
          <h2 className="text-2xl">Are you a Vedic priest?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enrol, list your offerings and receive bookings near you.
          </p>
        </div>
        <Button asChild variant="ritual">
          <Link to="/priest-enrolment">Enrol now</Link>
        </Button>
      </div>
    </div>
  );
}
