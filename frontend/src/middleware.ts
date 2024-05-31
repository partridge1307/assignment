import { baseURL } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const nextUrl = req.nextUrl.pathname;

  if (nextUrl.startsWith("/manage")) {
    const resp = await fetch(`${baseURL}/auth/session`, {
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
    });

    if (resp.status !== 200) return NextResponse.rewrite(new URL("/", req.url));

    const data = await resp.json();

    if (!!data && data.data.permission === "admin") {
      return NextResponse.next();
    }

    return NextResponse.rewrite(new URL("/", req.url));
  }

  return NextResponse.next();
}
