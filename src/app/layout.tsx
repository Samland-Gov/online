import type { Metadata } from "next";
import Providers from "./providers";

import './global.scss';

export const metadata: Metadata = {
  title: "Samland Government",
  description: "The official home of the Samland Government",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
