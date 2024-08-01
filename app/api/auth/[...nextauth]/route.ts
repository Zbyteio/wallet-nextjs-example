// Import necessary modules and providers from next-auth
import NextAuth from 'next-auth';
import 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// Extend the next-auth Session and JWT interfaces to include custom fields
declare module 'next-auth' {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refresh_token: string;
    expiresAt: number;
    error?: string;
  }
}

// Function to refresh the access token using the refresh token
const refreshAccessToken = (refresh: string): Promise<[Error | null, object | null]> => {
  return new Promise(async resolve => {
    let response;
    try {
      // Fetch a new token using the refresh token
      response = await fetch('https://dplat.zbyte.io/kc/realms/community/protocol/openid-connect/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: Object.entries({
          grant_type: 'refresh_token',
          client_id: process.env.KEYCLOAK_ID || '',
          client_secret: process.env.KEYCLOAK_SECRET || '',
          refresh_token: refresh
        }).map(([k, v]) => `${(encodeURIComponent(k))}=${(encodeURIComponent(v))}`).join('&')
      });
    } catch(e: any) {
      return resolve([new Error(`Error refreshing token: ${e.message}`), null]);
    }

    if (!response.ok) return resolve([new Error(`Error refreshing token: ${response.statusText}`), null]);

    resolve([null, await response.json()]);
  });
};

// NextAuth configuration
const handler = NextAuth({
  providers: [
    // Keycloak provider configuration
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID as string,
      clientSecret: process.env.KEYCLOAK_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER
    }),
  ],
  callbacks: {
    // JWT callback to handle token operations
    async jwt({ token, account, trigger, session }) {
      const tk = { ...token };

      if (account) {
        // Assign account tokens to the JWT token
        Object.assign(tk, {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expiresAt: account.expires_at
        });
      }

      // Refresh the token if it is expired or a refresh is triggered
      if (Date.now() > token.expiresAt * 1000 || (trigger === 'update' && session === 'keycloak:refresh')) {
        const [error, refreshed] = await refreshAccessToken(tk.refresh_token);
        error ? console.error(error) : Object.assign(tk, refreshed);
      }

      return tk;
    },

    // Session callback to handle session data
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.error = token.error;
      return session;
    }
  }
})

// Export the handler for GET and POST requests
export { handler as GET, handler as POST }