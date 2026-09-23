import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PanchangStrip } from "@/components/site/PanchangStrip";
import { prettyDate, todayISO } from "@/lib/epooja";

export const Route = createFileRoute("/panchang")({
  head: () => ({
    meta: [
      { title: "Daily Panchang & Auspicious Muhurats — Aura ePooja" },
      {
        name: "description",
        content:
          "Today's Tithi, Nakshatra, Yoga, Karana, Rahu Kaal and Abhijit Muhurat, plus auspicious windows for the coming weeks.",
      },
      { property: "og:title", content: "Daily Panchang & Muhurats — Aura ePooja" },
      {
        property: "og:description",
        content: "Tithi, Nakshatra, Rahu Kaal and auspicious booking windows.",
      },
    ],
  }),
  component: PanchangPage,
});

function PanchangPage() {
  const [date, setDate] = useState(todayISO());

  const { data: upcoming } = useQuery({
    queryKey: ["panchang", "range"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("panchang")
        .select("*")
        .gte("panchang_date", todayISO())
        .order("panchang_date")
        .limit(14);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="label-mono">Sacred time</p>
      <h1 className="mt-2 text-5xl">Daily Panchang</h1>

      <div className="mt-6 flex items-center gap-3">
        <label htmlFor="panchang-date" className="label-mono">
          Date
        </label>
        <input
          id="panchang-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-md border border-input bg-surface px-3 py-2 text-sm"
        />
      </div>

      <div className="mt-6">
        <PanchangStrip date={date} />
      </div>

      <h2 className="mt-14 text-3xl">Auspicious windows ahead</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(upcoming ?? []).map((d) => (
          <div key={d.panchang_date} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-primary">{prettyDate(d.panchang_date)}</p>
              <span
                className={
                  d.is_auspicious
                    ? "rounded-full border border-primary/50 px-2 py-0.5 text-[11px] text-primary"
                    : "rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                }
              >
                {d.is_auspicious ? "Auspicious" : "Restricted"}
              </span>
            </div>
            <p className="mt-2 text-sm">
              {d.tithi} · {d.nakshatra}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {((d.auspicious_windows as { label: string; time: string }[]) ?? []).map((w) => (
                <span
                  key={w.label}
                  className="rounded-md border border-border bg-secondary/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {w.label} · {w.time}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
