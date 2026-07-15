import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { getPostsByCategory, getCategories } from "@/lib/blog";
import { formatDate, truncate } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return generatePageMetadata({
    title: `${categoryName} — Blog`,
    description: `Browse ${categoryName.toLowerCase()} articles on FastVideoS. Tips, guides, and tutorials for video downloading.`,
    path: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const categories = getCategories();
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: categoryName, href: `/blog/category/${category}` },
        ]}
      />

      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {categoryName}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          {posts.length} {posts.length === 1 ? "article" : "articles"} in this category
        </p>
      </div>

      {/* Categories */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Link
          href="/blog"
          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              cat.slug === category
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {cat.name} ({cat.count})
          </Link>
        ))}
      </div>

      {/* Posts */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="aspect-video w-full rounded-t-2xl bg-gradient-to-br from-primary/10 to-primary/5" />
            <div className="p-5">
              <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <h2 className="mt-3 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {truncate(post.description, 120)}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.readingTime}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.date)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">No articles in this category yet.</p>
          <Link
            href="/blog"
            className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Browse all articles
          </Link>
        </div>
      )}
    </div>
  );
}
