import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-Ck9qVa6J.mjs";
import { t as supabase } from "./client-Drb7wB_Z.mjs";
import { t as useAuth } from "./useAuth-CoEZYZJm.mjs";
import { n as Label, t as Input } from "./label-CiMp5mKn.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./book-DjTGyXx3.mjs";
import { a as localities, c as todayISO, i as inr, o as prettyDate, r as imageFor, t as distanceKm } from "./epooja-CIk_7MAP.mjs";
import { t as Textarea } from "./textarea-CL2FQPHC.mjs";
import { l as Check, s as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as PriestCard } from "./cards-CeSu9jbx.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-6AsUPJLk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	"Ritual",
	"Date & muhurat",
	"Location",
	"Priest & payment"
];
function BookPage() {
	const { pooja: poojaSlug } = Route.useSearch();
	const navigate = useNavigate();
	const { user, loading: authLoading } = useAuth();
	const [step, setStep] = (0, import_react.useState)(0);
	const [poojaId, setPoojaId] = (0, import_react.useState)(null);
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const [muhurat, setMuhurat] = (0, import_react.useState)(null);
	const [locality, setLocality] = (0, import_react.useState)(localities[0]);
	const [address, setAddress] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [variant, setVariant] = (0, import_react.useState)("pooja_only");
	const [priestId, setPriestId] = (0, import_react.useState)(null);
	const [method, setMethod] = (0, import_react.useState)("upi");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { data: poojas } = useQuery({
		queryKey: ["poojas", "active"],
		queryFn: async () => {
			const { data, error } = await supabase.from("poojas").select("*").eq("active", true).order("category").order("base_price");
			if (error) throw error;
			return data;
		}
	});
	const selectedPooja = (0, import_react.useMemo)(() => {
		const list = poojas ?? [];
		if (poojaId) return list.find((p) => p.id === poojaId) ?? null;
		if (poojaSlug) return list.find((p) => p.slug === poojaSlug) ?? null;
		return null;
	}, [
		poojas,
		poojaId,
		poojaSlug
	]);
	const { data: panchang } = useQuery({
		queryKey: ["panchang", date],
		queryFn: async () => {
			const { data, error } = await supabase.from("panchang").select("*").eq("panchang_date", date).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const windows = panchang?.auspicious_windows ?? [];
	const { data: priestData } = useQuery({
		enabled: step >= 3 && !!selectedPooja,
		queryKey: [
			"priest-match",
			selectedPooja?.id,
			date
		],
		queryFn: async () => {
			const [{ data: priests, error: pe }, { data: offerings, error: oe }, { data: avail }] = await Promise.all([
				supabase.from("priests").select("*").eq("status", "approved"),
				supabase.from("priest_offerings").select("*").eq("pooja_id", selectedPooja.id).eq("active", true),
				supabase.from("priest_availability").select("priest_id, is_blocked").eq("available_date", date)
			]);
			if (pe) throw pe;
			if (oe) throw oe;
			const blocked = new Set((avail ?? []).filter((a) => a.is_blocked).map((a) => a.priest_id));
			return {
				priests: priests ?? [],
				offerings: offerings ?? [],
				blocked
			};
		}
	});
	const matches = (0, import_react.useMemo)(() => {
		if (!priestData) return [];
		return priestData.priests.filter((p) => !priestData.blocked.has(p.id)).map((p) => {
			return {
				priest: p,
				offering: priestData.offerings.find((o) => o.priest_id === p.id),
				distance: distanceKm(locality.lat, locality.lng, p.latitude, p.longitude)
			};
		}).filter((m) => m.offering && m.distance <= (m.priest.service_radius_km ?? 15)).sort((a, b) => a.distance - b.distance);
	}, [priestData, locality]);
	const chosen = matches.find((m) => m.priest.id === priestId) ?? null;
	const amount = chosen ? Number(variant === "pooja_only" ? chosen.offering.price_pooja_only : chosen.offering.price_with_items) : 0;
	const confirm = async () => {
		if (!user) {
			navigate({
				to: "/auth",
				search: { redirect: "/book" }
			});
			return;
		}
		if (!selectedPooja || !chosen) return;
		setBusy(true);
		const { data: booking, error } = await supabase.from("bookings").insert({
			customer_id: user.id,
			priest_id: chosen.priest.id,
			pooja_id: selectedPooja.id,
			variant,
			scheduled_date: date,
			scheduled_time: (muhurat?.time.split("–")[0] ?? "09:00").trim().slice(0, 5) + ":00",
			muhurat_label: muhurat?.label ?? null,
			location_address: address || locality.name,
			city: locality.name,
			latitude: locality.lat,
			longitude: locality.lng,
			amount,
			notes: notes || null,
			status: "awaiting_confirmation"
		}).select().single();
		if (error || !booking) {
			setBusy(false);
			toast.error(error?.message ?? "Could not create booking.");
			return;
		}
		const { error: payErr } = await supabase.from("payments").insert({
			booking_id: booking.id,
			amount,
			method,
			status: "paid"
		});
		setBusy(false);
		if (payErr) toast.error("Booking created, but payment could not be recorded.");
		else toast.success(`Booking ${booking.reference} confirmed.`);
		navigate({ to: "/dashboard" });
	};
	const canNext = step === 0 && !!selectedPooja || step === 1 && !!date || step === 2 && !!locality || step === 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-mono",
				children: "Guided booking"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-5xl",
				children: "Book a blessing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 flex flex-wrap gap-3",
				children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `flex items-center gap-2 rounded-full border px-4 py-2 text-xs ${i === step ? "border-primary/60 bg-primary/10 text-foreground" : i < step ? "border-border bg-secondary/50 text-muted-foreground" : "border-border/60 text-muted-foreground/70"}`,
					children: [i < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i + 1 }), s]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[1fr_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-panel rounded-2xl p-6",
					children: [
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: (poojas ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setPoojaId(p.id),
								className: `rounded-xl border p-4 text-left transition-colors ${selectedPooja?.id === p.id ? "border-primary/60 bg-primary/10" : "border-border hover:border-primary/40"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-mono",
										children: p.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-lg",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-xs text-muted-foreground",
										children: [
											inr(Number(p.base_price)),
											" · ",
											p.duration_minutes,
											" min"
										]
									})
								]
							}, p.id))
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "date",
									children: "Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "date",
									type: "date",
									value: date,
									min: todayISO(),
									onChange: (e) => {
										setDate(e.target.value);
										setMuhurat(null);
									},
									className: "mt-2 max-w-xs"
								})] }),
								panchang && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-xs text-muted-foreground",
									children: [
										panchang.tithi,
										" · ",
										panchang.nakshatra,
										" · Rahu Kaal ",
										panchang.rahu_kaal
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Auspicious windows"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [windows.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setMuhurat(w),
										className: `rounded-xl border px-4 py-2 text-left text-xs ${muhurat?.label === w.label ? "border-primary/60 bg-primary/10" : "border-border hover:border-primary/40"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-foreground",
											children: w.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-muted-foreground",
											children: w.time
										})]
									}, w.label)), windows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "No published muhurats for this date — the priest will suggest a time."
									})]
								})] })
							]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Locality (Bengaluru)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: localities.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setLocality(l),
										className: `rounded-full border px-4 py-2 text-xs ${locality.name === l.name ? "border-primary/60 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40"}`,
										children: l.name
									}, l.name))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "address",
									children: "Full address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "address",
									value: address,
									onChange: (e) => setAddress(e.target.value),
									placeholder: "Flat, building, street, landmark",
									className: "mt-2"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "notes",
									children: "Notes for the priest (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "notes",
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									className: "mt-2"
								})] })
							]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2",
									children: ["pooja_only", "pooja_with_items"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: variant === v ? "ritual" : "quiet",
										onClick: () => setVariant(v),
										children: v === "pooja_only" ? "Pooja only" : "Pooja with samagri"
									}, v))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [matches.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setPriestId(m.priest.id),
										className: `block w-full rounded-2xl border text-left transition-colors ${priestId === m.priest.id ? "border-primary/60" : "border-transparent"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriestCard, {
											priest: m.priest,
											distance: m.distance
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "px-5 pb-4 font-mono text-xs text-primary",
											children: inr(Number(variant === "pooja_only" ? m.offering.price_pooja_only : m.offering.price_with_items))
										})]
									}, m.priest.id)), matches.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "No priest available within range for this ritual and date. Try another date or locality."
									})]
								}),
								chosen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 border-t border-border/70 pt-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Payment method"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: [
												"upi",
												"card",
												"netbanking"
											].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: method === m ? "ritual" : "quiet",
												onClick: () => setMethod(m),
												className: "uppercase",
												children: m
											}, m))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ritual",
											size: "lg",
											disabled: busy || authLoading,
											onClick: confirm,
											children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), user ? `Pay ${inr(amount)} & confirm` : "Sign in to confirm"]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "quiet",
								size: "sm",
								disabled: step === 0,
								onClick: () => setStep((s) => Math.max(0, s - 1)),
								children: "Back"
							}), step < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ritual",
								size: "sm",
								disabled: !canNext,
								onClick: () => setStep((s) => s + 1),
								children: "Continue"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "glass-panel h-fit rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-mono",
							children: "Summary"
						}),
						selectedPooja ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-2xl",
							children: selectedPooja.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								selectedPooja.duration_minutes,
								" min ·",
								" ",
								variant === "pooja_only" ? "Pooja only" : "With samagri"
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Pick a ritual to begin."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Date",
									value: prettyDate(date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Muhurat",
									value: muhurat ? `${muhurat.label} · ${muhurat.time}` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Location",
									value: locality.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Priest",
									value: chosen?.priest.full_name ?? "—"
								})
							]
						}),
						chosen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center gap-3 border-t border-border/70 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: imageFor(chosen.priest.photo_key),
								alt: chosen.priest.full_name,
								loading: "lazy",
								className: "size-10 rounded-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-semibold",
								children: inr(amount)
							})]
						})
					]
				})]
			})
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right",
			children: value
		})]
	});
}
//#endregion
export { BookPage as component };
