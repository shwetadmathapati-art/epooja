import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PoojaCard, type Pooja } from "@/components/site/cards";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/poojas")({
  head: () => ({
    meta: [
      { title: "Poojas, Homas & Consultations — Aura ePooja" },
      {
        name: "description",
        content:
          "Browse Ganesha Pooja, Satyanarayana Pooja, Griha Pravesh, Navagraha Homa and more with transparent pricing.",
      },
      { property: "og:title", content: "Poojas, Homas & Consultations — Aura ePooja" },
      {
        property: "og:description",
        content: "Transparent pricing for every ritual, with or without samagri.",
      },
    ],
  }),
  component: PoojasPage,
});

const filters = ["all", "pooja", "homa", "consultation"] as const;

function PoojasPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["poojas", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poojas")
        .select("*")
        .eq("active", true)
        .order("category")
        .order("base_price");
      if (error) throw error;
      return data as Pooja[];
    },
  });

  const list = (data ?? []).filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="label-mono">Service catalogue</p>
      <h1 className="mt-2 text-5xl">Poojas & Homas</h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground">
        Every ritual is available as pooja-only or pooja-with-samagri. Prices below are the
        starting point; final amount depends on the priest you choose.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "ritual" : "quiet"}
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading rituals…</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PoojaCard key={p.id} pooja={p} />
          ))}
        </div>
      )}
    </div>
  );
}
