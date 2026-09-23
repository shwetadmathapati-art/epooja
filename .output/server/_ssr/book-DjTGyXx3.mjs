import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-DjTGyXx3.js
var $$splitComponentImporter = () => import("./book-6AsUPJLk.mjs");
var Route = createFileRoute("/book")({
	validateSearch: (search) => ({ pooja: typeof search.pooja === "string" ? search.pooja : void 0 }),
	head: () => ({ meta: [
		{ title: "Book a Pooja — Aura ePooja" },
		{
			name: "description",
			content: "Choose your ritual, pick an auspicious muhurat, set your location and book a verified Vedic priest near you."
		},
		{
			property: "og:title",
			content: "Book a Pooja — Aura ePooja"
		},
		{
			property: "og:description",
			content: "Four simple steps: ritual, muhurat, location, priest."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
