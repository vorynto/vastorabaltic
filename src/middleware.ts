import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          }
        }
      }
    );

    // Refresh session — required for Server Components and API routes
    const { data: { user } } = await supabase.auth.getUser();
    const isAdmin = user?.app_metadata?.role === "admin";

    if (isAdminRoute && !isLoginPage && !isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isLoginPage && isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } catch {
    // Supabase unreachable — protect admin routes by sending to login
    if (isAdminRoute && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  // Include API routes so the session is refreshed before each save call
  matcher: ["/admin/:path*", "/api/settings", "/api/content"]
};
