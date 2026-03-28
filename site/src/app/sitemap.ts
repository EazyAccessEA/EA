import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products";

const BASE = "https://eazyaccess.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const productSlugs = getAllSlugs();
  const productUrls = productSlugs.map((slug) => ({
    url: `${BASE}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/products`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...productUrls,
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/press`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];
}
