import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Labhkari",
  description: "Ecommerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <Link
          href="https://wa.me/+918607863200"
          className="fixed right-4 z-50 bottom-20 bg-green-500 text-white md:p-3 p-1 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={30} className="text-xl md:text-3xl z-50" />
        </Link>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
