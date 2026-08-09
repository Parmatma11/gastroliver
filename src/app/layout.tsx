import type { Metadata } from "next";
import { inter, playfair, dancingScript } from "./fonts";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AppointmentModal from "../components/ui/AppointmentModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://gastroliver.in"),
  other: {
    "google-site-verification": "Xg2I7jSBsPjdNdZeEsFAb7HabFMCMJG2C8eaMzMRz2Y",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dancingScript.variable}`}
    >
      <body>
        <Header />
        <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
          {children}
        </main>
        <Footer />
        <AppointmentModal />
      </body>
    </html>
  );
}
