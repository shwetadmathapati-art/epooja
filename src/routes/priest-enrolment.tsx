import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";
import { Textarea } from "@/Components/UI/textarea";
import { localities } from "@/lib/epooja";

export const Route = createFileRoute("/priest-enrolment")({
  head: () => ({
    meta: [
      { title: "Priest Enrolment — Aura ePooja" },
      {
        name: "description",
        content:
          "Join Aura ePooja as a verified Vedic priest. Share your experience, specialities and service area to receive bookings.",
      },
      { property: "og:title", content: "Priest Enrolment — Aura ePooja" },
      {
        property: "og:description",
        content: "Enrol, get verified, and serve devotees near you.",
      },
    ],
  }),
  component: EnrolPage,
});

function EnrolPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    title: "Vedic Priest",
    bio: "",
    experience_years: "5",
    languages: "Kannada, Sanskrit, English",
    specialities: "Ganesha Pooja, Satyanarayana Pooja",
    phone: "",
    city: localities[0]!.name,
    service_radius_km: "15",
  });

  const { data: existing, refetch } = useQuery({
    enabled: !!user,
    queryKey: ["my-priest", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("priests")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate({ to: "/auth", search: { redirect: "/priest-enrolment" } });
      return;
    }
    setBusy(true);
    const loc = localities.find((l) => l.name === form.city) ?? localities[0]!;
    const { error } = await supabase.from("priests").insert({
      user_id: user.id,
      full_name: form.full_name,
      title: form.title,
      bio: form.bio,
      experience_years: Number(form.experience_years) || 0,
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
      specialities: form.specialities.split(",").map((s) => s.trim()).filter(Boolean),
      phone: form.phone,
      city: loc.name,
      latitude: loc.lat,
      longitude: loc.lng,
      service_radius_km: Number(form.service_radius_km) || 15,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Enrolment submitted. Our team will verify your details.");
    void refetch();
  };

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="label-mono">Serve with us</p>
      <h1 className="mt-2 text-5xl">Priest enrolment</h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground">
        Share your details below. Our team verifies identity and credentials before your profile
        goes live to devotees.
      </p>

      {!loading && !user && (
        <div className="glass-panel mt-8 rounded-2xl p-6 text-sm">
          Please{" "}
          <Link to="/auth" search={{ redirect: "/priest-enrolment" }} className="text-primary">
            sign in
          </Link>{" "}
          to submit your enrolment.
        </div>
      )}

      {existing ? (
        <div className="glass-panel mt-8 space-y-2 rounded-2xl p-6">
          <p className="flex items-center gap-2 text-lg">
            <ShieldCheck className="size-4 text-primary" />
            Enrolment status: <span className="capitalize text-primary">{existing.status}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {existing.status === "approved"
              ? "Your profile is live. Manage bookings and availability from your dashboard."
              : "We are reviewing your details. You'll be notified once verified."}
          </p>
          <Button asChild variant="ritual" size="sm" className="mt-2">
            <Link to="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="glass-panel mt-8 grid gap-5 rounded-2xl p-6 sm:grid-cols-2">
          <Field label="Full name" id="full_name">
            <Input id="full_name" required value={form.full_name} onChange={set("full_name")} />
          </Field>
          <Field label="Title" id="title">
            <Input id="title" value={form.title} onChange={set("title")} />
          </Field>
          <Field label="Phone" id="phone">
            <Input id="phone" required value={form.phone} onChange={set("phone")} />
          </Field>
          <Field label="Years of experience" id="exp">
            <Input
              id="exp"
              type="number"
              min="0"
              value={form.experience_years}
              onChange={set("experience_years")}
            />
          </Field>
          <Field label="Languages (comma separated)" id="lang">
            <Input id="lang" value={form.languages} onChange={set("languages")} />
          </Field>
          <Field label="Specialities (comma separated)" id="spec">
            <Input id="spec" value={form.specialities} onChange={set("specialities")} />
          </Field>
          <Field label="Base locality" id="city">
            <select
              id="city"
              value={form.city}
              onChange={set("city")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {localities.map((l) => (
                <option key={l.name} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Service radius (km)" id="radius">
            <Input
              id="radius"
              type="number"
              min="1"
              value={form.service_radius_km}
              onChange={set("service_radius_km")}
            />
          </Field>
          <div className="sm:col-span-2">
            <Label htmlFor="bio">About you</Label>
            <Textarea
              id="bio"
              className="mt-2"
              value={form.bio}
              onChange={set("bio")}
              placeholder="Lineage, training, rituals you specialise in"
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" variant="ritual" size="lg" disabled={busy || !user}>
              {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
              Submit enrolment
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
