import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "سفر آگاه",
  description: "سفر آگاه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          background: "url('image.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
