import type { Metadata } from "next";
import { Playfair } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/(navbar)/page";
import Footer from "@/components/(footer)/page";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
const playfair = Playfair({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "TeaTempo",
  description:
    "A place where you can learn about your tea and coffee. Fresh and original. Place where you can able to buy your desire of drinks",
  icons: {
    icon: "/favicon.ico",
    href: "TeaTempo-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="TeaTempo-logo.png" />
      </head>
      <body className={`${playfair.className} `}>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(55 65 85)",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow colors-primary">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
