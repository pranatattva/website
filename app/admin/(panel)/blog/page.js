"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { formatDate } from "@/lib/format";

export default function Page() {
  return (
    <ResourceManager
      table="posts"
      title="Blog posts"
      singular="Post"
      description="Articles for the blog. Use ## for headings, - for list items, > for a quote and **bold** for emphasis."
      orderBy={{ column: "published_at", ascending: false }}
      searchKeys={["title", "category"]}
      toggleKey="is_published"
      defaults={{ author: "Pranatattva", is_published: true, published_at: new Date().toLocaleDateString("en-CA") }}
      columns={[
        { key: "title", label: "Title", render: (r) => <strong>{r.title}</strong> },
        { key: "category", label: "Category" },
        { key: "published_at", label: "Date", render: (r) => formatDate(r.published_at) },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true, full: true },
        { name: "slug", label: "URL slug", type: "slug", help: "The web address, e.g. what-is-pranic-healing" },
        { name: "category", label: "Category", type: "text", placeholder: "Basics, Meditation, Self-care" },
        { name: "author", label: "Author", type: "text" },
        { name: "published_at", label: "Publish date", type: "date" },
        { name: "excerpt", label: "Summary", type: "textarea", help: "Shown on the blog list and in search results" },
        { name: "content", label: "Article", type: "longtext" },
        { name: "cover_url", label: "Cover image", type: "image" },
        { name: "is_published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
