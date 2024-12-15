"use client";

import { MainHeader } from "@/components/MainHeader/MainHeader";
import { Theme } from '@carbon/react';

import './global.scss';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div>
            <Theme theme="g100">
                <MainHeader/>
            </Theme>
            {children}
        </div>
    );
}
