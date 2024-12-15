"use client";

import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems,
} from '@carbon/react';

import { Switcher, Notification, UserAvatar } from '@carbon/icons-react';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

interface HeaderRenderProps {
    isSideNavExpanded: boolean;
    onClickSideNavExpand: MouseEventHandler<HTMLButtonElement>;
}

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
    <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }: HeaderRenderProps) => (
            <Header aria-label="Main navigation container">
                <SkipToContent />
                <HeaderMenuButton
                    aria-label="Open side navigation"
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                />
                <Link href="/" passHref legacyBehavior>
                    <HeaderName prefix="">Samland Government</HeaderName>
                </Link>
                <HeaderNavigation aria-label="Main navigation">
                    {nav.map(item => (
                        <Link href={item.path} key={item.name} passHref legacyBehavior>
                            <HeaderMenuItem>{item.name}</HeaderMenuItem>
                        </Link>
                    ))}
                </HeaderNavigation>
                <SideNav
                    aria-label="Side navigation"
                    expanded={isSideNavExpanded}
                    isPersistent={false}
                >
                    <SideNavItems>
                        <HeaderSideNavItems>
                        {nav.map(item => (
                            <Link href={item.path} key={item.name} passHref legacyBehavior>
                                <HeaderMenuItem>{item.name}</HeaderMenuItem>
                            </Link>
                        ))}
                        </HeaderSideNavItems>
                    </SideNavItems>
                </SideNav>
                <HeaderGlobalBar>
                    <HeaderGlobalAction
                        aria-label="Notifications"
                        tooltipAlignment="center"
                        className="action-icons">
                        <Notification size={20} />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction
                        aria-label="User Avatar"
                        tooltipAlignment="center"
                        className="action-icons">
                        <UserAvatar size={20} />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
                        <Switcher size={20} />
                    </HeaderGlobalAction>
                </HeaderGlobalBar>
            </Header>
        )}
    />
)