import NextAuth from "next-auth";

import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credential) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MSW_URL}/api/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credential.email,
              password: credential.password,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok || data.error) {
          console.log("❌ 로그인 실패 - ", data.error);
          return null;
        }

        console.log("✅ 로그인 성공");
        return {
          id: data.user.id,
          email: data.user.account,
          name: data.user.name,
          accessToken: data.accessToken,
        };
      } catch (err) {
        console.error("❌ 요청 실패:", err);
        return null;
      }
    },
  }),
  GitHub,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  pages: {
    signIn: "/signin",
  },
  cookies: {
    // dev, prod 환경에 따라 session 명칭 분리
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // console.log("jwt 콜백 - 로그인 :", user);
        ((token.id = user.id),
          (token.email = user.email),
          (token.name = user.name),
          (token.accessToken = user.accessToken));
      }
      // console.log("token : ", token);
      return token;
    },

    async session({ session, token }) {
      // console.log("========== Session 콜백 ==========");
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.accessToken = token.accessToken as string;
      }

      // console.log(session);
      return session;
    },
  },
});
