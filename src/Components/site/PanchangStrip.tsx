import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { prettyDate, todayISO } from "@/lib/epooja";

export function usePanchang(date: string) {
  return useQuery({
    queryKey: ["panchang", date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("panchang")
        .select("*")
        .eq("panchang_date", date)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function PanchangStrip({ date = todayISO() }: { date?: string }) {
  const { data } = usePanchang(date);
  if (!data) return null;

  const cells = [
    { label: "Tithi", value: data.tithi },
    { label: "Nakshatra", value: data.nakshatra },
    { label: "Yoga", value: data.yoga },
    { label: "Karana", value: data.karana },
    { label: "Abhijit", value: data.abhijit_muhurat },
    { label: "Rahu Kaal", value: data.rahu_kaal },
  ];

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="label-mono">Panchang · {prettyDate(date)}</p>
        <p className="font-mono text-xs text-muted-foreground">
          Sunrise {String(data.sunrise).slice(0, 5)} · Sunset {String(data.sunset).slice(0, 5)}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cells.map((c) => (
          <div key={c.label}>
            <p className="label-mono">{c.label}</p>
            <p className="mt-1 text-sm text-foreground">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
