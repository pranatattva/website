"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { healingTypes } from "@/lib/site";

const CATEGORIES = [...healingTypes.map((h) => h.title), "Course", "Meditation", "Healing camp", "Other"];

export default function Page() {
  return (
    <ResourceManager
      table="testimonials"
      title="Testimonials"
      singular="Testimonial"
      description="Upload screenshots of client messages in portrait (9:16) format, and choose the type of healing. They slide on the home page; placeholders show until you add the first one. Hide names or numbers in the screenshot before uploading."
      orderBy={{ column: "sort_order", ascending: true }}
      searchKeys={["category", "name"]}
      toggleKey="is_published"
      defaults={{ is_published: true, sort_order: 0 }}
      columns={[
        { key: "image_url", label: "Screenshot", render: (r) => <img src={r.image_url} alt="" style={{ width: 45, height: 80, objectFit: "cover", borderRadius: 8 }} /> },
        { key: "category", label: "Healing type" },
        { key: "name", label: "Name" },
        { key: "sort_order", label: "Order" },
      ]}
      fields={[
        { name: "image_url", label: "Screenshot (9:16)", type: "image", required: true },
        { name: "category", label: "Type of healing", type: "select", options: CATEGORIES },
        { name: "name", label: "Client's first name (optional)", type: "text", placeholder: "e.g. Anita R." },
        { name: "sort_order", label: "Display order", type: "number", help: "Lower numbers show first" },
        { name: "is_published", label: "Show on website", type: "checkbox" },
      ]}
    />
  );
}
