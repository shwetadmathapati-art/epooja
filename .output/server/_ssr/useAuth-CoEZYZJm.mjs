import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Drb7wB_Z.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-CoEZYZJm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		(async () => {
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
	return {
		user,
		loading
	};
}
function useRoles() {
	const { user } = useAuth();
	const [isPriest, setIsPriest] = (0, import_react.useState)(false);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		if (!user) {
			setIsPriest(false);
			setIsAdmin(false);
			return;
		}
		(async () => {
			try {
				const { data } = await supabase.from("priests").select("id,status,user_id").eq("user_id", user.id).limit(1);
				if (!mounted) return;
				setIsPriest(!!(data && data.length > 0));
			} catch (e) {}
		})();
		const adminEmail = typeof processModule !== "undefined" && processModule.env["VITE_ADMIN_EMAIL"];
		if (adminEmail && user?.email && adminEmail === user.email) setIsAdmin(true);
		return () => {
			mounted = false;
		};
	}, [user]);
	return {
		isPriest,
		isAdmin
	};
}
//#endregion
export { useRoles as n, useAuth as t };
