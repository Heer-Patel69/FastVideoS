import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://fastvideos.univoid.tech/sitemap.xml`;

  return new NextResponse(robotsTxt.trim(), {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=18000",
    },
  });
}
