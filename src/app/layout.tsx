import type { Metadata } from "next";

import Providers from "./providers";
import '../styles/global.scss';
import '../styles/law_widget_styles.css';

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
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@lawsafrica/law-widgets@latest/dist/lawwidgets/lawwidgets.esm.js" type="module" defer></script>
      </head>
      <body>
        <div>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
