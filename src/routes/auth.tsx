import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";
import { useAuth } from "@/hooks/useAuth";

type Search = { redirect?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — Aura ePooja" },
      {
        name: "description",
        content: "Sign in or create your Aura ePooja account to book poojas and manage bookings.",
      },
      { property: "og:title", content: "Sign in — Aura ePooja" },
      { property: "og:description", content: "Access your bookings and priest panel." },
    ],
  }),
  component: AuthPage,
});

function safePath(value?: string) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

function AuthPage() {
  const { redirect } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });

  useEffect(() => {
    if (!loading && user) navigate({ to: safePath(redirect) });
  }, [loading, user, redirect, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}${safePath(redirect)}`,
          data: { full_name: form.fullName },
        },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. You're signed in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      setBusy(false);
      if (error) return toast.error(error.message);
    }
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return toast.error("Google sign-in failed. Please try again.");
    if (result.redirected) return;
    navigate({ to: safePath(redirect) });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20">
      <p className="label-mono">{mode === "signin" ? "Welcome back" : "Join us"}</p>
      <h1 className="mt-2 text-4xl">
        {mode === "signin" ? "Sign in to Aura ePooja" : "Create your account"}
      </h1>

      <form onSubmit={submit} className="glass-panel mt-8 space-y-5 rounded-2xl p-8">
        {mode === "signup" && (
          <div>
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="mt-2"
            />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-2"
          />
        </div>
        <Button type="submit" variant="ritual" size="lg" className="w-full" disabled={busy}>
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </Button>
        <Button type="button" variant="quiet" size="lg" className="w-full" onClick={google}>
          Continue with Google
        </Button>
        <button
          type="button"
          className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin"
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
