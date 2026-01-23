import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diabetic Retinopathy Detection",
  description: "Modern web app for diabetic retinopathy detection using AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={""}>{children}</body>
    </html>
  );
}
