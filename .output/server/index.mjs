globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/auth-DFk9uIVa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b4e-n11U6uPrmRYUfAHKlXWgJpuK09Q\"",
		"mtime": "2026-09-23T05:38:31.954Z",
		"size": 2894,
		"path": "../public/assets/auth-DFk9uIVa.js"
	},
	"/assets/book-C0NVEb_1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25d0-FbVZtpYZljvdGXQjYZhsnWa8riE\"",
		"mtime": "2026-09-23T05:38:31.957Z",
		"size": 9680,
		"path": "../public/assets/book-C0NVEb_1.js"
	},
	"/assets/button-q2TQ-EE0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8bac-KM6fQRaw7Iy4Aa6PKWaLcAWpElk\"",
		"mtime": "2026-09-23T05:38:31.961Z",
		"size": 35756,
		"path": "../public/assets/button-q2TQ-EE0.js"
	},
	"/assets/cards-DvGDHBid.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d20-nE+SehnZdsH9YD62X5cadHHZu9o\"",
		"mtime": "2026-09-23T05:38:31.964Z",
		"size": 3360,
		"path": "../public/assets/cards-DvGDHBid.js"
	},
	"/assets/dashboard-BA7BL5VQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155c-7vyx1N1eEcWTBTg9LIQbg6dd9Fw\"",
		"mtime": "2026-09-23T05:38:31.971Z",
		"size": 5468,
		"path": "../public/assets/dashboard-BA7BL5VQ.js"
	},
	"/assets/ClientOnly-CbbeimD_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3576-WsbTOBfaLXQlJW64v7y4Pj83Kdk\"",
		"mtime": "2026-09-23T05:38:31.945Z",
		"size": 13686,
		"path": "../public/assets/ClientOnly-CbbeimD_.js"
	},
	"/assets/epooja-CR5HAxvQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24b3-mWXBfu0eHBpkO1lunDTf7n3NEsA\"",
		"mtime": "2026-09-23T05:38:31.973Z",
		"size": 9395,
		"path": "../public/assets/epooja-CR5HAxvQ.js"
	},
	"/assets/festivals-BwHtv6YQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bc-SHD4svTS3guqE3zin9g4+8NkKTM\"",
		"mtime": "2026-09-23T05:38:31.976Z",
		"size": 1468,
		"path": "../public/assets/festivals-BwHtv6YQ.js"
	},
	"/assets/gallery-1-DMNoj2mG.jpg": {
		"type": "image/jpeg",
		"etag": "\"126a9-H1P5JVShIMZrMioyofj9fc9OCk0\"",
		"mtime": "2026-09-23T05:38:32.017Z",
		"size": 75433,
		"path": "../public/assets/gallery-1-DMNoj2mG.jpg"
	},
	"/assets/gallery-2-CiXCRcQP.jpg": {
		"type": "image/jpeg",
		"etag": "\"4a65-+ha3KEMyHLwqc18Eoi7wYcBa8t8\"",
		"mtime": "2026-09-23T05:38:32.019Z",
		"size": 19045,
		"path": "../public/assets/gallery-2-CiXCRcQP.jpg"
	},
	"/assets/gallery-3-u0bE0WHq.jpg": {
		"type": "image/jpeg",
		"etag": "\"cd08-N9XEFXNkV/Pd87aGAyKhO01Rn38\"",
		"mtime": "2026-09-23T05:38:32.022Z",
		"size": 52488,
		"path": "../public/assets/gallery-3-u0bE0WHq.jpg"
	},
	"/assets/hero-diya-BLQiUJgh.jpg": {
		"type": "image/jpeg",
		"etag": "\"1c143-690nB+DZYlKM08gqtxQ05s4rkOY\"",
		"mtime": "2026-09-23T05:38:32.032Z",
		"size": 115011,
		"path": "../public/assets/hero-diya-BLQiUJgh.jpg"
	},
	"/assets/contact-CiscY6DD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f4-w6ilw3M7zC/32qr4+8aawatzk2A\"",
		"mtime": "2026-09-23T05:38:31.968Z",
		"size": 2292,
		"path": "../public/assets/contact-CiscY6DD.js"
	},
	"/assets/jsx-runtime-Cltr0gcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ee-ObwGPj96dlkL76iVLbX2wLAXzuw\"",
		"mtime": "2026-09-23T05:38:31.979Z",
		"size": 8430,
		"path": "../public/assets/jsx-runtime-Cltr0gcK.js"
	},
	"/assets/label-B3eQmBA1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68d-ZX6nKuBvsfYla3ja90ZXxVtICLE\"",
		"mtime": "2026-09-23T05:38:31.981Z",
		"size": 1677,
		"path": "../public/assets/label-B3eQmBA1.js"
	},
	"/assets/gallery-4-Cp5wkqKA.jpg": {
		"type": "image/jpeg",
		"etag": "\"b76a-gH9dYP+grxVUbrU4BiaJcjGCxAU\"",
		"mtime": "2026-09-23T05:38:32.029Z",
		"size": 46954,
		"path": "../public/assets/gallery-4-Cp5wkqKA.jpg"
	},
	"/assets/loader-circle-DT4hyvNd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85-weEwKd5OYtW1UwXQkdQKCoxNfbw\"",
		"mtime": "2026-09-23T05:38:31.986Z",
		"size": 133,
		"path": "../public/assets/loader-circle-DT4hyvNd.js"
	},
	"/assets/poojas-DnPNDbGm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ab-bcsisv4ajgK0ipOchaZ3TFTZzP4\"",
		"mtime": "2026-09-23T05:38:31.992Z",
		"size": 1451,
		"path": "../public/assets/poojas-DnPNDbGm.js"
	},
	"/assets/PanchangStrip-rx5cmllY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51e-kBtNYYp+xFX/Pcsux+UPzOnY060\"",
		"mtime": "2026-09-23T05:38:31.951Z",
		"size": 1310,
		"path": "../public/assets/PanchangStrip-rx5cmllY.js"
	},
	"/assets/priest-2-ljLJF6pg.jpg": {
		"type": "image/jpeg",
		"etag": "\"67f8-pRNptRHRQlgfNiTlWyJ9gNAdTns\"",
		"mtime": "2026-09-23T05:38:32.039Z",
		"size": 26616,
		"path": "../public/assets/priest-2-ljLJF6pg.jpg"
	},
	"/assets/panchang-BWttzFYn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"845-bjY/4RNtXQOMphWY14M4kP8l6B0\"",
		"mtime": "2026-09-23T05:38:31.989Z",
		"size": 2117,
		"path": "../public/assets/panchang-BWttzFYn.js"
	},
	"/assets/priest-1-CngoiP2M.jpg": {
		"type": "image/jpeg",
		"etag": "\"70ce-NjeWY3VoEmegj8wbmzQccx1NC8Q\"",
		"mtime": "2026-09-23T05:38:32.037Z",
		"size": 28878,
		"path": "../public/assets/priest-1-CngoiP2M.jpg"
	},
	"/assets/priest-3-xOUiTWK-.jpg": {
		"type": "image/jpeg",
		"etag": "\"5d24-+rxhJLBzw4KItdilqBP9wB2QTn0\"",
		"mtime": "2026-09-23T05:38:32.044Z",
		"size": 23844,
		"path": "../public/assets/priest-3-xOUiTWK-.jpg"
	},
	"/assets/priest-enrolment-DeeyioLZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"134e-wsqUyl4H/RCdw86Q7IsKK1+UAHA\"",
		"mtime": "2026-09-23T05:38:31.995Z",
		"size": 4942,
		"path": "../public/assets/priest-enrolment-DeeyioLZ.js"
	},
	"/assets/index-BLz1Bj8w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e99b-aEBtA6PBz1560tX0/m5V6VxswDc\"",
		"mtime": "2026-09-23T05:38:31.942Z",
		"size": 584091,
		"path": "../public/assets/index-BLz1Bj8w.js"
	},
	"/assets/priests-CaU_aBy0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"638-K2FMgk9HnwZLCYbwLZRQmT/lRR0\"",
		"mtime": "2026-09-23T05:38:31.999Z",
		"size": 1592,
		"path": "../public/assets/priests-CaU_aBy0.js"
	},
	"/assets/shield-check-CqZkh505.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-Pn0v5C7s7LnalJ7hXfwIkDSZzac\"",
		"mtime": "2026-09-23T05:38:32.008Z",
		"size": 309,
		"path": "../public/assets/shield-check-CqZkh505.js"
	},
	"/assets/route-BrWu9KCN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-c8KFwu6l763BdgURaVlhtQwUjj0\"",
		"mtime": "2026-09-23T05:38:32.002Z",
		"size": 141,
		"path": "../public/assets/route-BrWu9KCN.js"
	},
	"/assets/useStore-CIlxvakt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ab-HH7XoXqV7Jx12UAk6Cov99nwZC8\"",
		"mtime": "2026-09-23T05:38:32.013Z",
		"size": 5547,
		"path": "../public/assets/useStore-CIlxvakt.js"
	},
	"/assets/routes-5TJv6ZaV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc5-djpFaY0cx3oqIKNrTK+FROvvMy0\"",
		"mtime": "2026-09-23T05:38:32.005Z",
		"size": 8133,
		"path": "../public/assets/routes-5TJv6ZaV.js"
	},
	"/assets/textarea-DWpoPXzP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"208-IfI/4/BGUGyloA6CtER6Z+TsEQ0\"",
		"mtime": "2026-09-23T05:38:32.010Z",
		"size": 520,
		"path": "../public/assets/textarea-DWpoPXzP.js"
	},
	"/assets/styles-Ba4TTD50.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1392c-iD8VschrK+VB/uJO5ReIv4JnrjA\"",
		"mtime": "2026-09-23T05:38:32.047Z",
		"size": 80172,
		"path": "../public/assets/styles-Ba4TTD50.css"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_b503Lk = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_b503Lk
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
