"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { formatINR } from "@/lib/format";

export default function Page() {
  return (
    <ResourceManager
      table="products"
      title="Products"
      singular="Product"
      description="Oils, salts and anything else you sell. Stock reduces automatically when an order is paid. If no product is visible, the Oils and salts section disappears from the website."
      orderBy={{ column: "sort_order", ascending: true }}
      searchKeys={["name", "category"]}
      toggleKey="is_active"
      defaults={{ category: "Oils", is_active: true, stock: 0 }}
      columns={[
        { key: "name", label: "Product", render: (r) => <strong>{r.name}</strong> },
        { key: "category", label: "Category" },
        { key: "price", label: "Price", render: (r) => r.sale_price != null && r.sale_price < r.price ? <><s className="muted">{formatINR(r.price)}</s> {formatINR(r.sale_price)}</> : formatINR(r.price) || <span className="muted">On request</span> },
        { key: "stock", label: "Stock", render: (r) => (r.stock <= 5 ? <span className="adm-warn">{r.stock}</span> : r.stock) },
      ]}
      fields={[
        { name: "name", label: "Product name", type: "text", required: true, full: true },
        { name: "category", label: "Category", type: "select", options: ["Oils", "Salts", "Crystals", "Books", "Other"], required: true },
        { name: "slug", label: "Slug", type: "slug" },
        { name: "size", label: "Size", type: "text", placeholder: "15 ml or 500 g" },
        { name: "price", label: "Price (₹)", type: "number", help: "Leave blank to show Ask on WhatsApp instead of Add to cart" },
        { name: "sale_price", label: "Discounted price (₹)", type: "number", help: "Optional. Shown with the original price crossed out." },
        { name: "stock", label: "Stock", type: "number" },
        { name: "sort_order", label: "Display order", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image_url", label: "Photo", type: "image" },
        { name: "is_active", label: "Show on website", type: "checkbox" },
      ]}
    />
  );
}
