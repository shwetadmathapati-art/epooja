import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-Ck9qVa6J.mjs";
import { t as supabase } from "./client-Drb7wB_Z.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PriestCard } from "./cards-CeSu9jbx.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/priests-8tJ5KtUH.js
var import_jsx_runtime = require_jsx_runtime();
function PriestsPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["priests", "all"],
		queryFn: async () => {
			const { data, error } = await supabase.from("priests").select("*").eq("status", "approved").order("rating", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-mono",
				children: "Our panel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-5xl",
				children: "Verified priests"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm text-muted-foreground",
				children: "Every priest is identity-verified and reviewed by the families they have served. Each serves bookings within a 15 km radius of their base area."
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted-foreground",
				children: "Loading priests…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 lg:grid-cols-2",
				children: (data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriestCard, { priest: p }, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Are you a Vedic priest?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Enrol, list your offerings and receive bookings near you."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ritual",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/priest-enrolment",
						children: "Enrol now"
					})
				})]
			})
		]
	});
}
//#endregion
export { PriestsPage as component };
