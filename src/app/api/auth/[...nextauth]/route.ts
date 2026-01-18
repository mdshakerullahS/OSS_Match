import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    githubAccessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    githubAccessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // authorization: {
      //   params: { scope: "read:user user:email repo" },
      // },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.githubAccessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && typeof token.githubAccessToken === "string") {
        session.githubAccessToken = token.githubAccessToken;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const runtime = "nodejs";
