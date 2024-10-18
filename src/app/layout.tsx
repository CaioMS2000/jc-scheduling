import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JG - Agenda",
  description: "Sistema de agendamento de Jhennifer Gomes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-black text-white tracking-tight`}
      >
        {children}
      </body>
    </html>
  );
}
