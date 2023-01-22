import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // session tiene informacion util del usuario
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
  // return NextResponse.redirect(new URL('/about-2',req.url)) // para redirigir hacia otra ruta
  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/address', '/checkout/summary']
};