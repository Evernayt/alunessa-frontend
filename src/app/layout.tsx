import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ContextProvider from "@/store/ContextProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alunessa",
  description:
    "Портфолио Alunessa - художницы и графического дизайнера. Ознакомьтесь с яркими цифровыми иллюстрациями, работами по графическому дизайну, узнайте больше об авторе и свяжитесь через соцсети.",
  keywords:
    "Alunessa, цифровая иллюстрация, графический дизайн, иллюстратор, дизайнер, рисунки, портфолио",
  openGraph: {
    title: "Alunessa",
    description:
      "Портфолио Alunessa - художницы и графического дизайнера. Ознакомьтесь с работами, узнайте больше об авторе и свяжитесь через соцсети.",
    url: "https://alunessa.ru",
    type: "website",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
