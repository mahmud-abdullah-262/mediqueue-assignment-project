import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toast } from "@heroui/react";
// import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} h-full antialiased`}>
      <Toast.Provider />
      <body className="min-h-full flex flex-col font-outfit bg-bg-light text-text-dark">
        {/* <SmoothScrollProvider/>  */}
        <ThemeProvider attribute='class' defaultTheme='light'> 
            <main className="flex-1 pb-20 lg:pb-0">{children}</main>
            <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
