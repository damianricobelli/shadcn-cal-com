import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});
export const metadata: Metadata = {
	title: "Shadcn Cal",
	description:
		"A copy of the monthly calendar used by Cal.com with Shadcn UI, Radix Colors and React Aria",
	openGraph: {
		title: "Shadcn Cal",
		description:
			"A copy of the monthly calendar used by Cal.com with Shadcn UI, Radix Colors and React Aria",
		url: "https://shadcn-cal-com.vercel.app/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"min-h-screen bg-gray-3 font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Analytics />
				<SpeedInsights />
				<ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
					<TooltipProvider delayDuration={0}>
						<Toaster richColors />
						{children}
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
