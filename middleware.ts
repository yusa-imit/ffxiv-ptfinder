import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const userModified = req.cookies.get('x-locale-user-modified');
  if (userModified) return NextResponse.next();
  console.log('hello');
  console.log(req.headers);
  console.log(req.ip);
  console.log(req.geo);
  if (req.geo) {
    const { locale } = req.nextUrl;
    const { country } = req.geo;
    if (country) {
      switch (country.toLocaleLowerCase()) {
        case 'kr': {
          if (locale === 'kr') return NextResponse.next();
          return NextResponse.rewrite(new URL(`/kr${req.nextUrl.pathname}`, req.url));
        }
        case 'jp': {
          if (locale === 'jp') return NextResponse.next();
          return NextResponse.rewrite(new URL(`/jp${req.nextUrl.pathname}`, req.url));
        }
        default:
          if (locale === undefined) return NextResponse.next();
          return NextResponse.rewrite(new URL(req.nextUrl.pathname, req.url));
      }
    }
  } else {
    const { ip } = req;
    console.log(ip);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|job_icons).*)',
  ],
};
