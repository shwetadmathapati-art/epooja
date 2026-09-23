import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-Ck9qVa6J.mjs";
import { t as supabase } from "./client-Drb7wB_Z.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as todayISO, o as prettyDate } from "./epooja-CIk_7MAP.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/festivals-DhqUiOmk.js
var import_jsx_runtime = require_jsx_runtime();
function FestivalsPage() {
	const { data } = useQuery({
		queryKey: ["festivals", "all"],
		queryFn: async () => {
			const { data, error } = await supabase.from("festivals").select("*").gte("festival_date", todayISO()).order("festival_date");
			if (error) throw error;
			return data;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-mono",
				children: "Calendar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-5xl",
				children: "Festivals ahead"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-4",
				children: (data ?? []).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-primary",
							children: prettyDate(f.festival_date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl",
							children: f.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xl text-sm text-muted-foreground",
							children: f.description
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [f.suggested_pooja && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 text-xs text-muted-foreground",
							children: [
								"Suggested pooja:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: f.suggested_pooja
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "brass",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/book",
								children: "Book for this day"
							})
						})]
					})]
				}, f.id))
			})
		]
	});
}
//#endregion
export { FestivalsPage as component };
