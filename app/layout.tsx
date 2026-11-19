import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Afro Beauty — La box qui te coiffe",
  description:
    "Box tresses prête à coiffer : mèches et accessoires pour knotless, nattes avec perles et crochet. Livrée le jour même à Toulouse.",
    openGraph: {
    title: "Afro Beauty — La box qui te coiffe",
    description: "Ta box tresses livrée le jour même à Toulouse.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
