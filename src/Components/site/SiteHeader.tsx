import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/Components/UI/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/Hooks/useAuth";

const nav = [
  { to: "/poojas", label: "Poojas & Homas" },
  { to: "/priests", label: "Priests" },
  { to: "/panchang", label: "Panchang" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="ritual-gradient flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
            ॐ
          </span>
          <span className="font-display text-xl tracking-tight">Aura ePooja</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button asChild variant="quiet" size="sm">
                <Link to="/dashboard">My bookings</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild variant="quiet" size="sm">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
          <Button asChild variant="ritual" size="sm">
            <Link to="/book">Book a pooja</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link to={user ? "/dashboard" : "/auth"} onClick={() => setOpen(false)} className="text-sm">
              {user ? "My bookings" : "Sign in"}
            </Link>
            <Button asChild variant="ritual" size="sm" onClick={() => setOpen(false)}>
              <Link to="/book">Book a pooja</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
