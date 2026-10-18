import "./globals.css";
import { site } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Pranic Healing Centre in Baner, Pune`, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: [{ url: "/brand/logo-mark-96.png", type: "image/png" }], apple: "/brand/logo-mark-192.png" },
  openGraph: { siteName: site.name, type: "website", locale: "en_IN", images: ["/brand/og-image.png"] },
};

export const viewport = { themeColor: "#faf7f2", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&family=Urbanist:wght@500;600&family=Lora:wght@500;600&family=Marcellus&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
