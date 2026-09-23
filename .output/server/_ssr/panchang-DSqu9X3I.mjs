import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as supabase } from "./client-Drb7wB_Z.mjs";
import { c as todayISO, o as prettyDate } from "./epooja-CIk_7MAP.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as PanchangStrip } from "./PanchangStrip-BGn6KEem.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panchang-DSqu9X3I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PanchangPage() {
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const { data: upcoming } = useQuery({
		queryKey: ["panchang", "range"],
		queryFn: async () => {
			const { data, error } = await supabase.from("panchang").select("*").gte("panchang_date", todayISO()).order("panchang_date").limit(14);
			if (error) throw error;
			return data;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-mono",
				children: "Sacred time"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-5xl",
				children: "Daily Panchang"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "panchang-date",
					className: "label-mono",
					children: "Date"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "panchang-date",
					type: "date",
					value: date,
					onChange: (e) => setDate(e.target.value),
					className: "rounded-md border border-input bg-surface px-3 py-2 text-sm"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanchangStrip, { date })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 text-3xl",
				children: "Auspicious windows ahead"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2",
				children: (upcoming ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-panel rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-primary",
								children: prettyDate(d.panchang_date)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: d.is_auspicious ? "rounded-full border border-primary/50 px-2 py-0.5 text-[11px] text-primary" : "rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground",
								children: d.is_auspicious ? "Auspicious" : "Restricted"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm",
							children: [
								d.tithi,
								" · ",
								d.nakshatra
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: (d.auspicious_windows ?? []).map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md border border-border bg-secondary/60 px-2 py-1 font-mono text-[11px] text-muted-foreground",
								children: [
									w.label,
									" · ",
									w.time
								]
							}, w.label))
						})
					]
				}, d.panchang_date))
			})
		]
	});
}
//#endregion
export { PanchangPage as component };
