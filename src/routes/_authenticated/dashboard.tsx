import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useRoles } from "@/Hooks/useAuth";
import { Button } from "@/Components/UI/button";
import { inr, prettyDate, statusLabel } from "@/lib/epooja";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Aura ePooja" },
      {
        name: "description",
        content: "Manage your pooja bookings, priest assignments and platform operations.",
      },
      { property: "og:title", content: "My Dashboard — Aura ePooja" },
      { property: "og:description", content: "Bookings, priests and payouts in one place." },
    ],
  }),
  component: Dashboard,
});

type BookingRow = {
  id: string;
  reference: string;
  customer_id: string;
  priest_id: string | null;
  scheduled_date: string;
  scheduled_time: string;
  muhurat_label: string | null;
  city: string;
  location_address: string;
  amount: number;
  status: string;
  variant: string;
  cancellation_charge: number;
  poojas: { name: string } | null;
  priests: { full_name: string; id: string; user_id: string | null } | null;
};

const tabs = ["bookings", "priest", "admin"] as const;

function Dashboard() {
  const { user } = useAuth();
  const { isAdmin, isPriest } = useRoles();
  const qc = useQueryClient();
  const [tab, setTab] = useState<(typeof tabs)[number]>("bookings");

  const { data: bookings, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, poojas(name), priests(id, full_name, user_id)")
        .order("scheduled_date", { ascending: false });
      if (error) throw error;
      return data as unknown as BookingRow[];
    },
  });

  const { data: pendingPriests } = useQuery({
    enabled: isAdmin,
    queryKey: ["admin-priests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("priests")
        .select("id, full_name, city, status, experience_years")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const mine = (bookings ?? []).filter((b) => b.customer_id === user?.id);
  const asPriest = (bookings ?? []).filter(
    (b) => b.priests?.user_id && b.priests.user_id === user?.id,
  );

  const setStatus = async (id: string, status: string, reason?: string) => {
    const patch: Record<string, unknown> = { status };
    if (status === "cancelled") {
      patch['cancellation_reason'] = reason ?? "Cancelled by user";
      patch['cancelled_at'] = new Date().toISOString();
    }
    const { error } = await supabase.from("bookings").update(patch).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Booking updated.");
    void qc.invalidateQueries({ queryKey: ["bookings"] });
  };

  const setPriestStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("priests").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Priest ${status}.`);
    void qc.invalidateQueries({ queryKey: ["admin-priests"] });
  };

  const visibleTabs = tabs.filter(
    (t) => t === "bookings" || (t === "priest" && isPriest) || (t === "admin" && isAdmin),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="label-mono">Your account</p>
      <h1 className="mt-2 text-5xl">Dashboard</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {visibleTabs.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={tab === t ? "ritual" : "quiet"}
            onClick={() => setTab(t)}
            className="capitalize"
          >
            {t === "bookings" ? "My bookings" : t === "priest" ? "Priest panel" : "Admin"}
          </Button>
        ))}
      </div>

      {tab === "bookings" && (
        <section className="mt-8 space-y-4">
          {isLoading && <p className="text-sm text-muted-foreground">Loading bookings…</p>}
          {!isLoading && mine.length === 0 && (
            <div className="glass-panel rounded-2xl p-8 text-sm text-muted-foreground">
              No bookings yet.{" "}
              <Link to="/book" className="text-primary">
                Book your first pooja
              </Link>
              .
            </div>
          )}
          {mine.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              actions={
                ["pending_payment", "awaiting_confirmation", "confirmed"].includes(b.status) ? (
                  <Button
                    size="sm"
                    variant="quiet"
                    onClick={() => setStatus(b.id, "cancelled", "Cancelled by customer")}
                  >
                    Cancel
                  </Button>
                ) : null
              }
            />
          ))}
        </section>
      )}

      {tab === "priest" && (
        <section className="mt-8 space-y-4">
          {asPriest.length === 0 && (
            <div className="glass-panel rounded-2xl p-8 text-sm text-muted-foreground">
              No assigned bookings yet.
            </div>
          )}
          {asPriest.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              actions={
                <div className="flex gap-2">
                  {b.status === "awaiting_confirmation" && (
                    <Button size="sm" variant="ritual" onClick={() => setStatus(b.id, "confirmed")}>
                      Confirm
                    </Button>
                  )}
                  {b.status === "confirmed" && (
                    <Button size="sm" variant="brass" onClick={() => setStatus(b.id, "completed")}>
                      Mark completed
                    </Button>
                  )}
                  {["awaiting_confirmation", "confirmed"].includes(b.status) && (
                    <Button
                      size="sm"
                      variant="quiet"
                      onClick={() => setStatus(b.id, "cancelled", "Cancelled by priest")}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              }
            />
          ))}
        </section>
      )}

      {tab === "admin" && (
        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Priests</h2>
            <div className="mt-4 space-y-3">
              {(pendingPriests ?? []).map((p) => (
                <div
                  key={p.id}
                  className="glass-panel flex items-center justify-between gap-4 rounded-xl p-4"
                >
                  <div>
                    <p className="text-sm">{p.full_name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {p.city} · {p.experience_years} yrs · {p.status}
                    </p>
                  </div>
                  {p.status !== "approved" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ritual"
                        onClick={() => setPriestStatus(p.id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="quiet"
                        onClick={() => setPriestStatus(p.id, "rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl">All bookings</h2>
            <div className="mt-4 space-y-3">
              {(bookings ?? []).map((b) => (
                <BookingCard key={b.id} booking={b} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function BookingCard({
  booking,
  actions,
  compact,
}: {
  booking: BookingRow;
  actions?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
      <div className="min-w-0">
        <p className="label-mono">{booking.reference}</p>
        <p className="mt-1 text-lg">{booking.poojas?.name ?? "Ritual"}</p>
        <p className="font-mono text-xs text-muted-foreground">
          {prettyDate(booking.scheduled_date)} · {booking.scheduled_time.slice(0, 5)}
          {booking.muhurat_label ? ` · ${booking.muhurat_label}` : ""} · {booking.city}
        </p>
        {!compact && (
          <p className="mt-1 text-xs text-muted-foreground">
            {booking.priests?.full_name ?? "Priest to be assigned"} ·{" "}
            {booking.variant === "pooja_only" ? "Pooja only" : "With samagri"}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-semibold">{inr(Number(booking.amount))}</p>
          <p className="font-mono text-xs text-primary">
            {statusLabel[booking.status] ?? booking.status}
          </p>
        </div>
        {actions}
      </div>
    </div>
  );
}
