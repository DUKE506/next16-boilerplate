import { auth } from "./auth";

export async function proxy(request: Request) {
  const session = await auth();
  const url = new URL(request.url);
  const pathname = url.pathname;

  //   console.log("session : ", session);

  // - 세션과 상관없이 접근 가능한 url
  const availablePath = [];
  // if (pathname.startsWith("/dashboard")) {
  //   console.log("경로일치");
  // }
}

export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 경로:
     * - api (API routes)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화)
     * - favicon.ico (파비콘)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
