'use client';

import Sider from 'antd/es/layout/Sider';
import Image from "next/image";
import Link from "next/link";
import {SunOutlined, AppstoreOutlined, DatabaseOutlined, SettingOutlined, UserDeleteOutlined} from '@ant-design/icons';
import {Menu, Typography, Button, Flex} from "antd";
import {usePathname} from "next/navigation";
import React, {useEffect, useMemo, useState} from "react";
import {theme} from 'antd'
import {logoutAndRedirect} from "@/utils/appwrite";

export default function AdminSidebar() {
    const pathname = usePathname();
    const {token} = theme.useToken();

    const items = useMemo(() => ([
        {
            key: '1',
            label: <Link href='/overview'>Overview</Link>,
            path: '/overview',
            icon: <AppstoreOutlined style={{color: token.colorTextBase}}/>,
        },
        {
            key: '2',
            label: <Link href='/profile'>Profile</Link>,
            path: '/profile',
            icon: <Image src='/profile_user.svg' alt='profile' width={17} height={17}/>,
        },
        {
            key: '3',
            label: 'Product',
            path: '/product',
            icon: <DatabaseOutlined/>,
            children: [
                {key: '3-1', label: <Link href='/product/smartWatch'>SmartWatch</Link>, path: '/product/smartWatch'},
                {key: '3-2', label: <Link href='/product/drone'>Drone</Link>, path: '/product/drone'},
                {key: '3-3', label: <Link href='/product/speaker'>Speaker</Link>, path: '/product/speaker'},
                {key: '3-4', label: <Link href='/product/chargers'>Chargers</Link>, path: '/product/chargers'}
            ],
        },
        {
            key: '4',
            label: <Link href='/customers'>Customers</Link>,
            path: '/customers',
            icon: <Image src='/customers.svg' alt='customers' width={17} height={17}/>,
        },
        {
            key: '5',
            label: <Link href='/message'>Message</Link>,
            path: '/message',
            icon: <Image src='/message_outline.svg' alt='message' width={17} height={17}/>,
        },
    ]), []);

    const accountItems = useMemo(() => ([
        {
            key: '1',
            label: <Link href='/settings'>Settings</Link>,
            path: '/settings',
            icon: <SettingOutlined/>,
        },

        {
            key: '2',
            label: <Link href='/help'>Help</Link>,
            path: '/help',
            icon: <Image src='/Messages-Bubble-Square-Question--Streamline-Ultimate.svg' alt='help' width={16}
                         height={16}/>,
        },


    ]), [])

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const [selectedKeysSettings, setSelectedKeysSettings] = useState<string[]>([]);
    const [openKeysSettings, setOpenKeysSettings] = useState<string[]>([]);


    useEffect(() => {
        const findMatch = (arr: any[]): { selected?: string; open?: string } => {
            for (const it of arr) {
                if (it.path && pathname.startsWith(it.path)) return {selected: it.key};
                if (it.children) {
                    const res = findMatch(it.children);
                    if (res.selected) return {selected: res.selected, open: it.key};
                }
            }
            return {};
        };
        const res = findMatch(items as any[]);
        setSelectedKeys(res.selected ? [res.selected] : []);
        setOpenKeys(res.open ? [res.open] : []);
    }, [pathname, items]);

    useEffect(() => {
        const findMatchSettings = (arr: any[]): { selected?: string; open?: string } => {
            for (const it of arr) {
                if (it.path && pathname.startsWith(it.path)) return {selected: it.key};
                if (it.children) {
                    const res = findMatchSettings(it.children);
                    if (res.selected) return {selected: res.selected, open: it.key};
                }
            }
            return {};
        };
        const res = findMatchSettings(accountItems as any[]);
        setSelectedKeysSettings(res.selected ? [res.selected] : []);
        setOpenKeysSettings(res.open ? [res.open] : []);
    }, [pathname, accountItems]);

    return (
        <Sider
            width={260}
            style={{backgroundColor: token.colorInfoBg, position: "sticky"}}
            className='container-admin--sidebar'
        >
            <Flex justify="space-between" align="center" style={{margin: '24px'}}>
                <Image src="/logo.svg" alt="logo" width={76} height={30} priority/>
                <Button shape="default" size="middle" icon={<SunOutlined/>} className='btn-outline--small'/>
            </Flex>

            <Typography.Title
                style={{
                    fontSize: token.fontSizeHeading4,
                    color: token.colorTextBase,
                    opacity: 0.53,
                    fontWeight: 600,
                    margin: '0 0 12px 24px',
                    paddingTop: 24
                }}
            >
                GENERAL MENU
            </Typography.Title>

            <Menu
                items={items}
                mode="inline"
                triggerSubMenuAction="click"
                openKeys={openKeys}
                onOpenChange={(keys) => setOpenKeys(keys as string[])}
                selectedKeys={selectedKeys}
                style={{backgroundColor: token.colorInfoBg, marginBottom: 24}}
            />

            <Typography.Title
                style={{
                    fontSize: token.fontSizeHeading4,
                    color: token.colorTextBase,
                    opacity: 0.53,
                    fontWeight: 600,
                    margin: '0 0 12px 24px',
                    paddingTop: 24
                }}
            >
                ACCOUNT
            </Typography.Title>

            <Menu
                items={accountItems}
                mode="inline"
                triggerSubMenuAction="click"
                openKeys={openKeysSettings}
                onOpenChange={(keys) => setOpenKeysSettings(keys as string[])}
                selectedKeys={selectedKeysSettings}
                style={{
                    backgroundColor: token.colorInfoBg,
                    marginBottom: 0
                }}
            />

            <Button icon={<UserDeleteOutlined/>} type="text"
                    onClick={logoutAndRedirect}
                    style={{marginLeft: 12, marginTop: 0, fontSize: 14, fontWeight: 400}}>Log Out</Button>

        </Sider>
    );
}
