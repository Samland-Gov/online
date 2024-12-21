"use client";

import { Header } from '@primer/react'
import Image from 'next/image';

const nav = [
    {
        name: "Legislation",
        path: "/expression"
    },
    {
        name: "Alerts",
        path: "/alerts"
    }
]

export const MainHeader = () => (
    <Header>
        <Header.Item>
            <Header.Link
                href="/"
                sx={{
                fontSize: 2,
                }}
            >
                <Image
                    src="https://raw.githubusercontent.com/Samland-Gov/.github/90e1aaa159f56aa471bfdf9e38b038bb1f0f887e/flag.svg"
                    height={24}
                    alt='Flag of Samland'
                />
                <span>Samland</span>
            </Header.Link>
        </Header.Item>
        {nav.map(item => (
            <Header.Item key={item.name}>
                <Header.Link href={item.path}>{item.name}</Header.Link>
            </Header.Item>
        ))}
    </Header> 
);