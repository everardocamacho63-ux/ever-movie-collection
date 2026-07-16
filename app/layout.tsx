import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
title: "The Ever Collection",
description:
"Colección personal de películas en VHS, DVD, Blu-ray y 4K UHD.",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="es">
<body>{children}</body>
</html>
);
}