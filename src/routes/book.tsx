import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";
import { Textarea } from "@/Components/UI/textarea";
import { PriestCard, type Priest, type Pooja } from "@/Components/site/cards";
import {
  distanceKm,
  inr,
  imageFor,
  localities,
  prettyDate,
  todayISO,
} from "@/lib/epooja";

type Search = { pooja?: string };

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    pooja: typeof search.pooja === "string" ? search.pooja : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Pooja — Aura ePooja" },
      {
        name: "description",
        content:
          "Choose your ritual, pick an auspicious muhurat, set your location and book a verified Vedic priest near you.",
      },
      { property: "og:title", content: "Book a Pooja — Aura ePooja" },
      {
        property: "og:description",
        content: "Four simple steps: ritual, muhurat, location, priest.",
      },
    ],
  }),
  component: BookPage,
});

type Offering = {
  id: string;
  priest_id: string;
  pooja_id: string;
  price_pooja_only: number;
  price_with_items: number;
  active: boolean;
};

const steps = ["Ritual", "Date & muhurat", "Location", "Priest & payment"] as const;

function BookPage() {
  const { pooja: poojaSlug } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState(0);
  const [poojaId, setPoojaId] = useState<string | null>(null);
  const [date, setDate] = useState(todayISO());
  const [muhurat, setMuhurat] = useState<{ label: string; time: string } | null>(null);
  const [locality, setLocality] = useState(localities[0]!);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [variant, setVariant] = useState<"pooja_only" | "pooja_with_items">("pooja_only");
  const [priestId, setPriestId] = useState<string | null>(null);
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [busy, setBusy] = useState(false);

  const { data: poojas } = useQuery({
    queryKey: ["poojas", "active"],
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

  const selectedPooja = useMemo(() => {
    const list = poojas ?? [];
    if (poojaId) return list.find((p) => p.id === poojaId) ?? null;
    if (poojaSlug) return list.find((p) => p.slug === poojaSlug) ?? null;
    return null;
  }, [poojas, poojaId, poojaSlug]);

  const { data: panchang } = useQuery({
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

  const windows = (panchang?.auspicious_windows ?? []) as { label: string; time: string }[];

  const { data: priestData } = useQuery({
    enabled: step >= 3 && !!selectedPooja,
    queryKey: ["priest-match", selectedPooja?.id, date],
    queryFn: async () => {
      const [{ data: priests, error: pe }, { data: offerings, error: oe }, { data: avail }] =
        await Promise.all([
          supabase.from("priests").select("*").eq("status", "approved"),
          supabase
            .from("priest_offerings")
            .select("*")
            .eq("pooja_id", selectedPooja!.id)
            .eq("active", true),
          supabase
            .from("priest_availability")
            .select("priest_id, is_blocked")
            .eq("available_date", date),
        ]);
      if (pe) throw pe;
      if (oe) throw oe;
      const blocked = new Set(
        (avail ?? []).filter((a) => a.is_blocked).map((a) => a.priest_id),
      );
      return {
        priests: (priests ?? []) as unknown as (Priest & {
          latitude: number;
          longitude: number;
          service_radius_km: number;
        })[],
        offerings: (offerings ?? []) as Offering[],
        blocked,
      };
    },
  });

  const matches = useMemo(() => {
    if (!priestData) return [];
    return priestData.priests
      .filter((p) => !priestData.blocked.has(p.id))
      .map((p) => {
        const offering = priestData.offerings.find((o) => o.priest_id === p.id);
        return {
          priest: p,
          offering,
          distance: distanceKm(locality.lat, locality.lng, p.latitude, p.longitude),
        };
      })
      .filter((m) => m.offering && m.distance <= (m.priest.service_radius_km ?? 15))
      .sort((a, b) => a.distance - b.distance);
  }, [priestData, locality]);

  const chosen = matches.find((m) => m.priest.id === priestId) ?? null;
  const amount = chosen
    ? Number(
        variant === "pooja_only"
          ? chosen.offering!.price_pooja_only
          : chosen.offering!.price_with_items,
      )
    : 0;

  const confirm = async () => {
    if (!user) {
      navigate({ to: "/auth", search: { redirect: "/book" } });
      return;
    }
    if (!selectedPooja || !chosen) return;
    setBusy(true);
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        customer_id: user.id,
        priest_id: chosen.priest.id,
        pooja_id: selectedPooja.id,
        variant,
        scheduled_date: date,
        scheduled_time: (muhurat?.time.split("–")[0] ?? "09:00").trim().slice(0, 5) + ":00",
        muhurat_label: muhurat?.label ?? null,
        location_address: address || locality.name,
        city: locality.name,
        latitude: locality.lat,
        longitude: locality.lng,
        amount,
        notes: notes || null,
        status: "awaiting_confirmation",
      })
      .select()
      .single();

    if (error || !booking) {
      setBusy(false);
      toast.error(error?.message ?? "Could not create booking.");
      return;
    }

    const { error: payErr } = await supabase.from("payments").insert({
      booking_id: booking.id,
      amount,
      method,
      status: "paid",
    });
    setBusy(false);
    if (payErr) {
      toast.error("Booking created, but payment could not be recorded.");
    } else {
      toast.success(`Booking ${booking.reference} confirmed.`);
    }
    navigate({ to: "/dashboard" });
  };

  const canNext =
    (step === 0 && !!selectedPooja) ||
    (step === 1 && !!date) ||
    (step === 2 && !!locality) ||
    step === 3;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="label-mono">Guided booking</p>
      <h1 className="mt-2 text-5xl">Book a blessing</h1>

      <ol className="mt-8 flex flex-wrap gap-3">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs ${
              i === step
                ? "border-primary/60 bg-primary/10 text-foreground"
                : i < step
                  ? "border-border bg-secondary/50 text-muted-foreground"
                  : "border-border/60 text-muted-foreground/70"
            }`}
          >
            {i < step ? <Check className="size-3 text-primary" /> : <span>{i + 1}</span>}
            {s}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="glass-panel rounded-2xl p-6">
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {(poojas ?? []).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPoojaId(p.id)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    selectedPooja?.id === p.id
                      ? "border-primary/60 bg-primary/10"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <p className="label-mono">{p.category}</p>
                  <p className="mt-1 text-lg">{p.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {inr(Number(p.base_price))} · {p.duration_minutes} min
                  </p>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  min={todayISO()}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setMuhurat(null);
                  }}
                  className="mt-2 max-w-xs"
                />
              </div>
              {panchang && (
                <p className="font-mono text-xs text-muted-foreground">
                  {panchang.tithi} · {panchang.nakshatra} · Rahu Kaal {panchang.rahu_kaal}
                </p>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Auspicious windows</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {windows.map((w) => (
                    <button
                      key={w.label}
                      onClick={() => setMuhurat(w)}
                      className={`rounded-xl border px-4 py-2 text-left text-xs ${
                        muhurat?.label === w.label
                          ? "border-primary/60 bg-primary/10"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <span className="block text-foreground">{w.label}</span>
                      <span className="font-mono text-muted-foreground">{w.time}</span>
                    </button>
                  ))}
                  {windows.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No published muhurats for this date — the priest will suggest a time.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">Locality (Bengaluru)</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {localities.map((l) => (
                    <button
                      key={l.name}
                      onClick={() => setLocality(l)}
                      className={`rounded-full border px-4 py-2 text-xs ${
                        locality.name === l.name
                          ? "border-primary/60 bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="address">Full address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat, building, street, landmark"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes for the priest (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="flex gap-2">
                {(["pooja_only", "pooja_with_items"] as const).map((v) => (
                  <Button
                    key={v}
                    size="sm"
                    variant={variant === v ? "ritual" : "quiet"}
                    onClick={() => setVariant(v)}
                  >
                    {v === "pooja_only" ? "Pooja only" : "Pooja with samagri"}
                  </Button>
                ))}
              </div>

              <div className="space-y-3">
                {matches.map((m) => (
                  <button
                    key={m.priest.id}
                    onClick={() => setPriestId(m.priest.id)}
                    className={`block w-full rounded-2xl border text-left transition-colors ${
                      priestId === m.priest.id ? "border-primary/60" : "border-transparent"
                    }`}
                  >
                    <PriestCard priest={m.priest} distance={m.distance} />
                    <p className="px-5 pb-4 font-mono text-xs text-primary">
                      {inr(
                        Number(
                          variant === "pooja_only"
                            ? m.offering!.price_pooja_only
                            : m.offering!.price_with_items,
                        ),
                      )}
                    </p>
                  </button>
                ))}
                {matches.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No priest available within range for this ritual and date. Try another date
                    or locality.
                  </p>
                )}
              </div>

              {chosen && (
                <div className="space-y-3 border-t border-border/70 pt-5">
                  <p className="text-sm text-muted-foreground">Payment method</p>
                  <div className="flex flex-wrap gap-2">
                    {(["upi", "card", "netbanking"] as const).map((m) => (
                      <Button
                        key={m}
                        size="sm"
                        variant={method === m ? "ritual" : "quiet"}
                        onClick={() => setMethod(m)}
                        className="uppercase"
                      >
                        {m}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="ritual"
                    size="lg"
                    disabled={busy || authLoading}
                    onClick={confirm}
                  >
                    {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
                    {user ? `Pay ${inr(amount)} & confirm` : "Sign in to confirm"}
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              variant="quiet"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </Button>
            {step < 3 && (
              <Button
                variant="ritual"
                size="sm"
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
              >
                Continue
              </Button>
            )}
          </div>
        </div>

        <aside className="glass-panel h-fit rounded-2xl p-6">
          <p className="label-mono">Summary</p>
          {selectedPooja ? (
            <>
              <h2 className="mt-2 text-2xl">{selectedPooja.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {selectedPooja.duration_minutes} min ·{" "}
                {variant === "pooja_only" ? "Pooja only" : "With samagri"}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Pick a ritual to begin.</p>
          )}
          <dl className="mt-5 space-y-2 text-sm">
            <Row label="Date" value={prettyDate(date)} />
            <Row label="Muhurat" value={muhurat ? `${muhurat.label} · ${muhurat.time}` : "—"} />
            <Row label="Location" value={locality.name} />
            <Row label="Priest" value={chosen?.priest.full_name ?? "—"} />
          </dl>
          {chosen && (
            <div className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
              <img
                src={imageFor(chosen.priest.photo_key)}
                alt={chosen.priest.full_name}
                loading="lazy"
                className="size-10 rounded-full object-cover"
              />
              <p className="text-lg font-semibold">{inr(amount)}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
