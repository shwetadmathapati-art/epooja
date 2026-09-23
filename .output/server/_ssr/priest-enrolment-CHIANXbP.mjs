import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-Ck9qVa6J.mjs";
import { t as supabase } from "./client-Drb7wB_Z.mjs";
import { t as useAuth } from "./useAuth-CoEZYZJm.mjs";
import { n as Label, t as Input } from "./label-CiMp5mKn.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as localities } from "./epooja-CIk_7MAP.mjs";
import { t as Textarea } from "./textarea-CL2FQPHC.mjs";
import { i as ShieldCheck, s as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/priest-enrolment-CHIANXbP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EnrolPage() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		title: "Vedic Priest",
		bio: "",
		experience_years: "5",
		languages: "Kannada, Sanskrit, English",
		specialities: "Ganesha Pooja, Satyanarayana Pooja",
		phone: "",
		city: localities[0].name,
		service_radius_km: "15"
	});
	const { data: existing, refetch } = useQuery({
		enabled: !!user,
		queryKey: ["my-priest", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("priests").select("*").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const submit = async (e) => {
		e.preventDefault();
		if (!user) {
			navigate({
				to: "/auth",
				search: { redirect: "/priest-enrolment" }
			});
			return;
		}
		setBusy(true);
		const loc = localities.find((l) => l.name === form.city) ?? localities[0];
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
			service_radius_km: Number(form.service_radius_km) || 15
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Enrolment submitted. Our team will verify your details.");
		refetch();
	};
	const set = (k) => (e) => setForm((f) => ({
		...f,
		[k]: e.target.value
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-mono",
				children: "Serve with us"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-5xl",
				children: "Priest enrolment"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm text-muted-foreground",
				children: "Share your details below. Our team verifies identity and credentials before your profile goes live to devotees."
			}),
			!loading && !user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel mt-8 rounded-2xl p-6 text-sm",
				children: [
					"Please",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						search: { redirect: "/priest-enrolment" },
						className: "text-primary",
						children: "sign in"
					}),
					" ",
					"to submit your enrolment."
				]
			}),
			existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel mt-8 space-y-2 rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }),
							"Enrolment status: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize text-primary",
								children: existing.status
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: existing.status === "approved" ? "Your profile is live. Manage bookings and availability from your dashboard." : "We are reviewing your details. You'll be notified once verified."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ritual",
						size: "sm",
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Go to dashboard"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "glass-panel mt-8 grid gap-5 rounded-2xl p-6 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full name",
						id: "full_name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "full_name",
							required: true,
							value: form.full_name,
							onChange: set("full_name")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						id: "title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "title",
							value: form.title,
							onChange: set("title")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone",
						id: "phone",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							required: true,
							value: form.phone,
							onChange: set("phone")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Years of experience",
						id: "exp",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "exp",
							type: "number",
							min: "0",
							value: form.experience_years,
							onChange: set("experience_years")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Languages (comma separated)",
						id: "lang",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lang",
							value: form.languages,
							onChange: set("languages")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Specialities (comma separated)",
						id: "spec",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "spec",
							value: form.specialities,
							onChange: set("specialities")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Base locality",
						id: "city",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "city",
							value: form.city,
							onChange: set("city"),
							className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
							children: localities.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: l.name,
								children: l.name
							}, l.name))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Service radius (km)",
						id: "radius",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "radius",
							type: "number",
							min: "1",
							value: form.service_radius_km,
							onChange: set("service_radius_km")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bio",
							children: "About you"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "bio",
							className: "mt-2",
							value: form.bio,
							onChange: set("bio"),
							placeholder: "Lineage, training, rituals you specialise in"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							variant: "ritual",
							size: "lg",
							disabled: busy || !user,
							children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), "Submit enrolment"]
						})
					})
				]
			})
		]
	});
}
function Field({ label, id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		htmlFor: id,
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2",
		children
	})] });
}
//#endregion
export { EnrolPage as component };
