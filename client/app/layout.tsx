import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat app",
    description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
