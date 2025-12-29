import "next-auth";
import { DefaultSession } from "next-auth";
//로그인 시 서버로부터 전달받는 데이터 또는 token에 저장할 데이터
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
    accessToken?: string; // ✅ 추가
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    accessToken?: string; // ✅ 추가
  }
}
