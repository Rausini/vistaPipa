import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://vistapipa.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vista Pipa — Óculos solar, polarizado e de grau",
    template: "%s · Vista Pipa",
  },
  description:
    "Óculos com equilíbrio entre forma e função. Solar, polarizado e de grau, com a leveza e o espírito de Pipa-RN.",
  icons: {
    icon: "/assets/logo/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Vista Pipa",
    title: "Vista Pipa — Óculos solar, polarizado e de grau",
    description:
      "Poucos enxergam como nós. Óculos clássicos, leves e feitos para acompanhar o seu movimento.",
    images: [{ url: "/assets/images/og-image.webp", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
