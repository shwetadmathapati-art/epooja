import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-Ck9qVa6J.mjs";
import { t as supabase } from "./client-Drb7wB_Z.mjs";
import { t as useAuth } from "./useAuth-CoEZYZJm.mjs";
import { n as Label, t as Input } from "./label-CiMp5mKn.mjs";
import { _ as useSearch, g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-HGlY4yyp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovable = { auth: { async signInWithOAuth(provider, opts) {
	console.info(`[lovable] signInWithOAuth called: provider=${provider}`);
	return {
		redirected: false,
		error: null
	};
} } };
function safePath(value) {
	return value && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}
function AuthPage() {
	const { redirect } = useSearch({ from: "/auth" });
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		email: "",
		password: "",
		fullName: ""
	});
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({ to: safePath(redirect) });
	}, [
		loading,
		user,
		redirect,
		navigate
	]);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		if (mode === "signup") {
			const { error } = await supabase.auth.signUp({
				email: form.email,
				password: form.password,
				options: {
					emailRedirectTo: `${window.location.origin}${safePath(redirect)}`,
					data: { full_name: form.fullName }
				}
			});
			setBusy(false);
			if (error) return toast.error(error.message);
			toast.success("Account created. You're signed in.");
		} else {
			const { error } = await supabase.auth.signInWithPassword({
				email: form.email,
				password: form.password
			});
			setBusy(false);
			if (error) return toast.error(error.message);
		}
	};
	const google = async () => {
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
		if (result.error) return toast.error("Google sign-in failed. Please try again.");
		if (result.redirected) return;
		navigate({ to: safePath(redirect) });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-md flex-col px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-mono",
				children: mode === "signin" ? "Welcome back" : "Join us"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl",
				children: mode === "signin" ? "Sign in to Aura ePooja" : "Create your account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "glass-panel mt-8 space-y-5 rounded-2xl p-8",
				children: [
					mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "fullName",
						children: "Full name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "fullName",
						required: true,
						value: form.fullName,
						onChange: (e) => setForm({
							...form,
							fullName: e.target.value
						}),
						className: "mt-2"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						type: "email",
						required: true,
						value: form.email,
						onChange: (e) => setForm({
							...form,
							email: e.target.value
						}),
						className: "mt-2"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "password",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "password",
						type: "password",
						required: true,
						minLength: 6,
						value: form.password,
						onChange: (e) => setForm({
							...form,
							password: e.target.value
						}),
						className: "mt-2"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "ritual",
						size: "lg",
						className: "w-full",
						disabled: busy,
						children: busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "quiet",
						size: "lg",
						className: "w-full",
						onClick: google,
						children: "Continue with Google"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "w-full text-center text-xs text-muted-foreground hover:text-foreground",
						onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
						children: mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"
					})
				]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
