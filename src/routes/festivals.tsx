import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { prettyDate, todayISO } from "@/lib/epooja";

export const Route = createFileRoute("/festivals")({
  head: () => ({
    meta: [
      { title: "Festival Calendar & Suggested Poojas — Aura ePooja" },
      {
        name: "description",
        content:
          "Upcoming Hindu festivals with the poojas traditionally performed on each day, ready to book.",
      },
      { property: "og:title", content: "Festival Calendar — Aura ePooja" },
      {
        property: "og:description",
        content: "Upcoming festivals and the poojas performed on each day.",
      },
    ],
  }),
  component: FestivalsPage,
});

function FestivalsPage() {
  const { data } = useQuery({
    queryKey: ["festivals", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("festivals")
        .select("*")
        .gte("festival_date", todayISO())
        .order("festival_date");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="label-mono">Calendar</p>
      <h1 className="mt-2 text-5xl">Festivals ahead</h1>

      <div className="mt-10 space-y-4">
        {(data ?? []).map((f) => (
          <div
            key={f.id}
            className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6"
          >
            <div>
              <p className="font-mono text-xs text-primary">{prettyDate(f.festival_date)}</p>
              <h2 className="mt-1 text-2xl">{f.name}</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">{f.description}</p>
            </div>
            <div className="text-right">
              {f.suggested_pooja && (
                <p className="mb-3 text-xs text-muted-foreground">
                  Suggested pooja:{" "}
                  <span className="text-foreground">{f.suggested_pooja}</span>
                </p>
              )}
              <Button asChild variant="brass" size="sm">
                <Link to="/book">Book for this day</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
