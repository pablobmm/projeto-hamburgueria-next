import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Code Burger",
  description: "A melhor hamburgueria dev do Brasil!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className} bg-black text-white`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}