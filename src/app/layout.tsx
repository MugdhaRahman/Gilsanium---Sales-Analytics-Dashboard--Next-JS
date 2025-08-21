import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React from "react";
import {AntdRegistry} from '@ant-design/nextjs-registry';


const inter = Inter({
    subsets: ["latin"], display: "swap",
});

export const metadata: Metadata = {
    title: "Gilsanium Sales and Analytic Dashboard", description: "Developed by Mugdha Rahman",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="en">
    <body
        className={inter.className}
    >
    <AntdRegistry>{children}</AntdRegistry>
    </body>
    </html>);
}