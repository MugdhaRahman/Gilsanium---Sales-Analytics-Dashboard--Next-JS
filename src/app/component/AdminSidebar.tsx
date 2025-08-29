'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';
import Link from 'next/link';
import {
    SunOutlined,
    AppstoreOutlined,
    DatabaseOutlined,
    SettingOutlined,
    UserDeleteOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Menu, Typography, Button, Flex, theme } from 'antd';
import type { MenuProps } from 'antd';
import { usePathname } from 'next/navigation';
import { logoutAndRedirect } from '@/utils/appwrite';

type NavItem = {
    key: string;
    label: React.ReactNode;
    path?: string; // custom field (used only by us)
    icon?: React.ReactNode;
    children?: NavItem[];
};

// Helper result type for match finder
type MatchResult = { selected?: string; open?: string };

export default function AdminSidebar({
                                         collapsed,
                                         setCollapsed,
                                     }: {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}) {
    const pathname = usePathname();
    const { token } = theme.useToken();

    // MAIN MENU
    const items: NavItem[] = useMemo(
        () => [
            {
                key: '1',
                label: <Link href="/overview">Overview</Link>,
                path: '/overview',
                icon: <AppstoreOutlined style={{ color: token.colorTextBase }} />,
            },
            {
                key: '2',
                label: <Link href="/profile">Profile</Link>,
                path: '/profile',
                icon: <Image src="/profile_user.svg" alt="profile" width={17} height={17} />,
            },
            {
                key: '3',
                label: 'Product',
                path: '/product',
                icon: <DatabaseOutlined />,
                children: [
                    { key: '3-1', label: <Link href="/product/smartWatch">SmartWatch</Link>, path: '/product/smartWatch' },
                    { key: '3-2', label: <Link href="/product/drone">Drone</Link>, path: '/product/drone' },
                    { key: '3-3', label: <Link href="/product/speaker">Speaker</Link>, path: '/product/speaker' },
                    { key: '3-4', label: <Link href="/product/chargers">Chargers</Link>, path: '/product/chargers' },
                ],
            },
            {
                key: '4',
                label: <Link href="/customers">Customers</Link>,
                path: '/customers',
                icon: <Image src="/customers.svg" alt="customers" width={17} height={17} />,
            },
            {
                key: '5',
                label: <Link href="/message">Message</Link>,
                path: '/message',
                icon: <Image src="/message_outline.svg" alt="message" width={17} height={17} />,
            },
        ],
        [token.colorTextBase] // ✅ include token dependency
    );

    // ACCOUNT MENU
    const accountItems: NavItem[] = useMemo(
        () => [
            { key: '1', label: <Link href="/settings">Settings</Link>, path: '/settings', icon: <SettingOutlined /> },
            {
                key: '2',
                label: <Link href="/help">Help</Link>,
                path: '/help',
                icon: <Image src="/Messages-Bubble-Square-Question--Streamline-Ultimate.svg" alt="help" width={16} height={16} />,
            },
        ],
        []
    );

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const [selectedKeysSettings, setSelectedKeysSettings] = useState<string[]>([]);
    const [openKeysSettings, setOpenKeysSettings] = useState<string[]>([]);

    // Strongly-typed recursive match finder
    const findMatch = (arr: ReadonlyArray<NavItem>): MatchResult => {
        for (const it of arr) {
            if (it.path && pathname.startsWith(it.path)) return { selected: it.key };
            if (it.children) {
                const res = findMatch(it.children);
                if (res.selected) return { selected: res.selected, open: it.key };
            }
        }
        return {};
    };

    useEffect(() => {
        const res = findMatch(items);
        setSelectedKeys(res.selected ? [res.selected] : []);
        setOpenKeys(res.open ? [res.open] : []);
    }, [pathname, items]);

    useEffect(() => {
        const res = findMatch(accountItems);
        setSelectedKeysSettings(res.selected ? [res.selected] : []);
        setOpenKeysSettings(res.open ? [res.open] : []);
    }, [pathname, accountItems]);

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            className="container-admin--sidebar"
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
            trigger={null}
        >
            {/* Header Section */}
            <Flex justify="space-between" align="center" style={{ margin: '24px' }}>
                {/* Logo */}
                <Image src="/logo.svg" alt="logo" width={76} height={30} priority />

                {/* SunOutlined Button */}
                <Button shape="default" size="middle" icon={<SunOutlined />} className="btn-outline--small" />

                {/* Collapse Button */}
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: 20,
                        color: token.colorTextBase,
                    }}
                />
            </Flex>

            {/* General Menu */}
            <Typography.Title
                style={{
                    fontSize: token.fontSizeHeading4,
                    color: token.colorTextBase,
                    opacity: 0.53,
                    fontWeight: 600,
                    margin: '0 0 12px 24px',
                    paddingTop: 24,
                }}
            >
                GENERAL MENU
            </Typography.Title>

            <Menu
                theme="light"
                items={items as MenuProps['items']}
                mode="inline"
                triggerSubMenuAction="click"
                openKeys={openKeys}
                onOpenChange={(keys) => setOpenKeys(keys as string[])}
                selectedKeys={selectedKeys}
                style={{ backgroundColor: token.colorInfoBg, marginBottom: 24 }}
            />

            {/* Account Menu */}
            <Typography.Title
                style={{
                    fontSize: token.fontSizeHeading4,
                    color: token.colorTextBase,
                    opacity: 0.53,
                    fontWeight: 600,
                    margin: '0 0 12px 24px',
                    paddingTop: 24,
                }}
            >
                ACCOUNT
            </Typography.Title>

            <Menu
                items={accountItems as MenuProps['items']}
                mode="inline"
                triggerSubMenuAction="click"
                openKeys={openKeysSettings}
                onOpenChange={(keys) => setOpenKeysSettings(keys as string[])}
                selectedKeys={selectedKeysSettings}
                style={{ backgroundColor: token.colorInfoBg, marginBottom: 0 }}
            />

            {/* Logout Button */}
            <Button
                icon={<UserDeleteOutlined />}
                type="text"
                onClick={logoutAndRedirect}
                style={{ marginLeft: 12, marginTop: 0, fontSize: 14, fontWeight: 400 }}
            >
                Log Out
            </Button>
        </Sider>
    );
}