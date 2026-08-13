import type { Metadata } from "next";
import { glacialIndifference, dancingScript } from "./fonts";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AppointmentModal from "../components/ui/AppointmentModal";
import MainLayoutWrapper from "../components/layout/MainLayoutWrapper";

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
      className={`${glacialIndifference.variable} ${dancingScript.variable}`}
    >
      <body>
        <Header />
        <MainLayoutWrapper>
          {children}
        </MainLayoutWrapper>
        <Footer />
        <AppointmentModal />
      </body>
    </html>
  );
}
