import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  const token = await getToken({
    //Token will exist if user is logged in
    req,
    secret: process.env.JWT_SECRET,
  });
  const { pathname } = req.nextUrl;
  // Allow the requests if the follwing is true...
  // If the token exists for next-auth session & provider fetching or the token already exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  // Redirect them to login if they don't have token and are requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}
