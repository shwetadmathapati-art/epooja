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
	"/assets/auth-D51GH9UN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b4e-+7E0pSwLiVjWZRvDvyz9u8x1NYE\"",
		"mtime": "2026-09-23T05:24:27.993Z",
		"size": 2894,
		"path": "../public/assets/auth-D51GH9UN.js"
	},
	"/assets/button-D2N8Z-Nl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64a-AI4WL5flhxaCo14jSfB4CeFmhDg\"",
		"mtime": "2026-09-23T05:24:27.999Z",
		"size": 1610,
		"path": "../public/assets/button-D2N8Z-Nl.js"
	},
	"/assets/book-BRoOTw7i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25d0-Ux9p9HkydCz1/iZVbVdrLWxeb9E\"",
		"mtime": "2026-09-23T05:24:27.996Z",
		"size": 9680,
		"path": "../public/assets/book-BRoOTw7i.js"
	},
	"/assets/ClientOnly-CbbeimD_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3576-WsbTOBfaLXQlJW64v7y4Pj83Kdk\"",
		"mtime": "2026-09-23T05:24:27.988Z",
		"size": 13686,
		"path": "../public/assets/ClientOnly-CbbeimD_.js"
	},
	"/assets/dashboard-BQbHyuMp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156b-ZtUyeH6PGBIPinT5aLUS9JKTCm8\"",
		"mtime": "2026-09-23T05:24:28.005Z",
		"size": 5483,
		"path": "../public/assets/dashboard-BQbHyuMp.js"
	},
	"/assets/contact-_RGWCAD4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f4-ji5UWyL1FKGapSWmMK18qxcH/h4\"",
		"mtime": "2026-09-23T05:24:28.002Z",
		"size": 2292,
		"path": "../public/assets/contact-_RGWCAD4.js"
	},
	"/assets/cards-CGBk2Ass.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0d-C7nOTWuFZKGbhjW/YCtwyZjhQDU\"",
		"mtime": "2026-09-23T05:24:28.001Z",
		"size": 3341,
		"path": "../public/assets/cards-CGBk2Ass.js"
	},
	"/assets/epooja-VcUefFaG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24b8-soXRsgzKvr3SmLkVl70/0WpAnjU\"",
		"mtime": "2026-09-23T05:24:28.007Z",
		"size": 9400,
		"path": "../public/assets/epooja-VcUefFaG.js"
	},
	"/assets/festivals-BizMb20Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c1-rJ8P13vpmk9reOX17hsImYcGlew\"",
		"mtime": "2026-09-23T05:24:28.012Z",
		"size": 1473,
		"path": "../public/assets/festivals-BizMb20Y.js"
	},
	"/assets/gallery-1-DMNoj2mG.jpg": {
		"type": "image/jpeg",
		"etag": "\"126a9-H1P5JVShIMZrMioyofj9fc9OCk0\"",
		"mtime": "2026-09-23T05:24:28.063Z",
		"size": 75433,
		"path": "../public/assets/gallery-1-DMNoj2mG.jpg"
	},
	"/assets/gallery-2-CiXCRcQP.jpg": {
		"type": "image/jpeg",
		"etag": "\"4a65-+ha3KEMyHLwqc18Eoi7wYcBa8t8\"",
		"mtime": "2026-09-23T05:24:28.067Z",
		"size": 19045,
		"path": "../public/assets/gallery-2-CiXCRcQP.jpg"
	},
	"/assets/gallery-3-u0bE0WHq.jpg": {
		"type": "image/jpeg",
		"etag": "\"cd08-N9XEFXNkV/Pd87aGAyKhO01Rn38\"",
		"mtime": "2026-09-23T05:24:28.072Z",
		"size": 52488,
		"path": "../public/assets/gallery-3-u0bE0WHq.jpg"
	},
	"/assets/hero-diya-BLQiUJgh.jpg": {
		"type": "image/jpeg",
		"etag": "\"1c143-690nB+DZYlKM08gqtxQ05s4rkOY\"",
		"mtime": "2026-09-23T05:24:28.081Z",
		"size": 115011,
		"path": "../public/assets/hero-diya-BLQiUJgh.jpg"
	},
	"/assets/gallery-4-Cp5wkqKA.jpg": {
		"type": "image/jpeg",
		"etag": "\"b76a-gH9dYP+grxVUbrU4BiaJcjGCxAU\"",
		"mtime": "2026-09-23T05:24:28.079Z",
		"size": 46954,
		"path": "../public/assets/gallery-4-Cp5wkqKA.jpg"
	},
	"/assets/label-C6U9rIqu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68c-XUCH3qyAz3vv1MXhiDuMHh5vz9M\"",
		"mtime": "2026-09-23T05:24:28.020Z",
		"size": 1676,
		"path": "../public/assets/label-C6U9rIqu.js"
	},
	"/assets/loader-circle-DFzUmcvI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85-k5ckSD2EO5AKS1pKdGCw3RsvggU\"",
		"mtime": "2026-09-23T05:24:28.023Z",
		"size": 133,
		"path": "../public/assets/loader-circle-DFzUmcvI.js"
	},
	"/assets/jsx-runtime-Cltr0gcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ee-ObwGPj96dlkL76iVLbX2wLAXzuw\"",
		"mtime": "2026-09-23T05:24:28.018Z",
		"size": 8430,
		"path": "../public/assets/jsx-runtime-Cltr0gcK.js"
	},
	"/assets/PanchangStrip-Cs9DgfBE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51e-Sm05DRHyfG51WvDpE7FKCEYZkNw\"",
		"mtime": "2026-09-23T05:24:27.991Z",
		"size": 1310,
		"path": "../public/assets/PanchangStrip-Cs9DgfBE.js"
	},
	"/assets/panchang-BGlPAZjF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"845-b9bcxStuivxc0c5sFY1+LRo+5/k\"",
		"mtime": "2026-09-23T05:24:28.026Z",
		"size": 2117,
		"path": "../public/assets/panchang-BGlPAZjF.js"
	},
	"/assets/priest-1-CngoiP2M.jpg": {
		"type": "image/jpeg",
		"etag": "\"70ce-NjeWY3VoEmegj8wbmzQccx1NC8Q\"",
		"mtime": "2026-09-23T05:24:28.084Z",
		"size": 28878,
		"path": "../public/assets/priest-1-CngoiP2M.jpg"
	},
	"/assets/priest-2-ljLJF6pg.jpg": {
		"type": "image/jpeg",
		"etag": "\"67f8-pRNptRHRQlgfNiTlWyJ9gNAdTns\"",
		"mtime": "2026-09-23T05:24:28.089Z",
		"size": 26616,
		"path": "../public/assets/priest-2-ljLJF6pg.jpg"
	},
	"/assets/poojas-BSpTyEhf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ab-k4Mh0WdFZh6EDv5Q0XTHsSlW7IA\"",
		"mtime": "2026-09-23T05:24:28.030Z",
		"size": 1451,
		"path": "../public/assets/poojas-BSpTyEhf.js"
	},
	"/assets/priest-3-xOUiTWK-.jpg": {
		"type": "image/jpeg",
		"etag": "\"5d24-+rxhJLBzw4KItdilqBP9wB2QTn0\"",
		"mtime": "2026-09-23T05:24:28.093Z",
		"size": 23844,
		"path": "../public/assets/priest-3-xOUiTWK-.jpg"
	},
	"/assets/priest-enrolment-mOJxoa7r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"134e-HrCVrFSzHdfTzak63midCz2PgXc\"",
		"mtime": "2026-09-23T05:24:28.033Z",
		"size": 4942,
		"path": "../public/assets/priest-enrolment-mOJxoa7r.js"
	},
	"/assets/index-BQvgDQgt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8efbe-boSPRQlDJvQFQRqtkOviTTNYfKk\"",
		"mtime": "2026-09-23T05:24:27.987Z",
		"size": 585662,
		"path": "../public/assets/index-BQvgDQgt.js"
	},
	"/assets/route-JB7sFYC_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-Moxa6yI/u/VcIfOURA1kYIecqms\"",
		"mtime": "2026-09-23T05:24:28.040Z",
		"size": 141,
		"path": "../public/assets/route-JB7sFYC_.js"
	},
	"/assets/styles-Ba4TTD50.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1392c-iD8VschrK+VB/uJO5ReIv4JnrjA\"",
		"mtime": "2026-09-23T05:24:28.097Z",
		"size": 80172,
		"path": "../public/assets/styles-Ba4TTD50.css"
	},
	"/assets/textarea-B_Lgqy71.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-+pbsFQcApyJjFcidrfs28kcoBlY\"",
		"mtime": "2026-09-23T05:24:28.053Z",
		"size": 519,
		"path": "../public/assets/textarea-B_Lgqy71.js"
	},
	"/assets/priests-BCs1Fi3O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"638-MYotqsXs8mR/SytCjlmEl1hc5l4\"",
		"mtime": "2026-09-23T05:24:28.037Z",
		"size": 1592,
		"path": "../public/assets/priests-BCs1Fi3O.js"
	},
	"/assets/shield-check-CSlPoxqL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-mnXRVKYLtqt2IFFZMd2nFVX0fcE\"",
		"mtime": "2026-09-23T05:24:28.048Z",
		"size": 309,
		"path": "../public/assets/shield-check-CSlPoxqL.js"
	},
	"/assets/routes-CujLgrsh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fca-/jLzX53YxSWZ02wf0i95rKPxN+o\"",
		"mtime": "2026-09-23T05:24:28.044Z",
		"size": 8138,
		"path": "../public/assets/routes-CujLgrsh.js"
	},
	"/assets/utils-Dhjdk9Ut.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85e1-zc/DG82m6XTihxkrGwH+myDTsGE\"",
		"mtime": "2026-09-23T05:24:28.058Z",
		"size": 34273,
		"path": "../public/assets/utils-Dhjdk9Ut.js"
	},
	"/assets/useStore-CIlxvakt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ab-HH7XoXqV7Jx12UAk6Cov99nwZC8\"",
		"mtime": "2026-09-23T05:24:28.055Z",
		"size": 5547,
		"path": "../public/assets/useStore-CIlxvakt.js"
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
