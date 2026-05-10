import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WikiDo",
  description: "조직 단위 위키 + 데스크톱 작업 보조",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        {/*
          Pretendard from the same CDN the design proto used. Living in <link>
          (not as a CSS @import) avoids the Tailwind v4 import-order parser
          error. For production, self-host or use next/font/local.
        */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
