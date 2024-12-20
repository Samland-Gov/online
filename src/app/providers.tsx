"use client";

import { MainHeader } from "@/components/MainHeader";
import { ThemeProvider, BaseStyles } from '@primer/react'

import '../styles/global.scss';
import '../styles/law_widget_styles.css';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <BaseStyles>
        <MainHeader/>
        {children}
      </BaseStyles>
    </ThemeProvider>
  );
}
