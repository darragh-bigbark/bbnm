import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXTAUTH_URL || "https://bbnm.ie";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/auth/", "/submit"],
      },
      // Block known bad bots and scrapers
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "BLEXBot", disallow: "/" },
      { userAgent: "DataForSeoBot", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
