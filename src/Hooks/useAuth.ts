import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    void (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(data?.user ?? null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading } as const;
}

export function useRoles() {
  const { user } = useAuth();
  const [isPriest, setIsPriest] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!user) {
      setIsPriest(false);
      setIsAdmin(false);
      return;
    }

    void (async () => {
      try {
        const { data } = await supabase.from("priests").select("id,status,user_id").eq("user_id", user.id).limit(1);
        if (!mounted) return;
        setIsPriest(!!(data && data.length > 0));
      } catch (e) {
        // ignore
      }
    })();

    // Admin detection: optional env-based override
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || (typeof process !== 'undefined' && process.env['VITE_ADMIN_EMAIL']);
    if (adminEmail && user?.email && adminEmail === user.email) setIsAdmin(true);

    return () => {
      mounted = false;
    };
  }, [user]);

  return { isPriest, isAdmin } as const;
}
