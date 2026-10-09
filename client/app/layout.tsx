import type { Metadata } from "next";
import "./global.css";
import { SessionProvider } from "./session-provider";

export const metadata: Metadata = {
    title: "Chat app",
    description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="fr">
            <body><SessionProvider>{children}</SessionProvider></body>
        </html>
    );
}
