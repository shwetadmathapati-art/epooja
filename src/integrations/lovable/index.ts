// Minimal lovable stub for local development
// Exports a `lovable` object with an `auth.signInWithOAuth` method used by the app.

export const lovable = {
  auth: {
    async signInWithOAuth(provider: string, opts?: { redirect_uri?: string }) {
      // In production this would redirect to an OAuth flow. For local/dev,
      // return a non-redirected successful result so the app continues.
      console.info(`[lovable] signInWithOAuth called: provider=${provider}`);
      return { redirected: false, error: null };
    },
  },
};

export default lovable;
