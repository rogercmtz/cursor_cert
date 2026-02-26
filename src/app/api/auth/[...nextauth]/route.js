import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { upsertUser } from "../../../../lib/supabase-server.js";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user?.email) {
        const result = await upsertUser({
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? profile?.picture ?? null,
          providerId: account?.provider ? `${account.provider}:${profile?.sub ?? account.providerAccountId}` : null,
        });
        if (!result.ok) {
          console.error("[NextAuth] Supabase upsertUser failed:", result.error);
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) token.accessToken = account.access_token;
      if (profile) token.picture = profile.picture;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.image = token.picture ?? session.user.image;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
