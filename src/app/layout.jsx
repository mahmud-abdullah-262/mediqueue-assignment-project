import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "MediQueue",
  description: "Tutor booking system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-outfit bg-bg-light text-text-dark">
       
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
