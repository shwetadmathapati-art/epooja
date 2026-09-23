import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Aura ePooja — Booking Help & Queries" },
      {
        name: "description",
        content:
          "Questions about a booking, a priest or a ritual? Send the Aura ePooja team a message and we'll respond quickly.",
      },
      { property: "og:title", content: "Contact Aura ePooja" },
      {
        property: "og:description",
        content: "Send us a query about bookings, priests or rituals.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("customer_queries").insert({
      user_id: user?.id ?? null,
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject,
      message: form.message,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Query sent. Our team will get back to you.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="label-mono">Support</p>
      <h1 className="mt-2 text-5xl">Talk to us</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Ask about rituals, samagri, priest availability or an existing booking.
      </p>

      <form onSubmit={submit} className="glass-panel mt-10 space-y-5 rounded-2xl p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" required value={form.name} onChange={set("name")} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={set("email")}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" value={form.phone} onChange={set("phone")} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              required
              value={form.subject}
              onChange={set("subject")}
              className="mt-2"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={set("message")}
            className="mt-2"
          />
        </div>
        <Button type="submit" variant="ritual" size="lg" disabled={busy}>
          {busy ? "Sending…" : "Send message"}
        </Button>
      </form>
    </div>
  );
}
