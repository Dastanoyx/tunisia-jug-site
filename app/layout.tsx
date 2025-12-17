import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
    title: {
        default: site.name,
        template: `%s · ${site.shortName}`,
    },
    description: site.description,
    metadataBase: new URL("https://example.com"),
    openGraph: {
        title: site.name,
        description: site.description,
        type: "website",
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        {/* Navigation */}
        <SiteNav />

        {/* Main content */}
        <main className="w-full py-0">{children}</main>

        {/* Footer */}
        <SiteFooter />
        </body>
        </html>
    );
}
