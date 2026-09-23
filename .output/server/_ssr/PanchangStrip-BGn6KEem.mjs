import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as supabase } from "./client-Drb7wB_Z.mjs";
import { c as todayISO, o as prettyDate } from "./epooja-CIk_7MAP.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PanchangStrip-BGn6KEem.js
var import_jsx_runtime = require_jsx_runtime();
function usePanchang(date) {
	return useQuery({
		queryKey: ["panchang", date],
		queryFn: async () => {
			const { data, error } = await supabase.from("panchang").select("*").eq("panchang_date", date).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
}
function PanchangStrip({ date = todayISO() }) {
	const { data } = usePanchang(date);
	if (!data) return null;
	const cells = [
		{
			label: "Tithi",
			value: data.tithi
		},
		{
			label: "Nakshatra",
			value: data.nakshatra
		},
		{
			label: "Yoga",
			value: data.yoga
		},
		{
			label: "Karana",
			value: data.karana
		},
		{
			label: "Abhijit",
			value: data.abhijit_muhurat
		},
		{
			label: "Rahu Kaal",
			value: data.rahu_kaal
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel rounded-2xl p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "label-mono",
				children: ["Panchang · ", prettyDate(date)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs text-muted-foreground",
				children: [
					"Sunrise ",
					String(data.sunrise).slice(0, 5),
					" · Sunset ",
					String(data.sunset).slice(0, 5)
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6",
			children: cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-mono",
				children: c.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-foreground",
				children: c.value
			})] }, c.label))
		})]
	});
}
//#endregion
export { PanchangStrip as t };
