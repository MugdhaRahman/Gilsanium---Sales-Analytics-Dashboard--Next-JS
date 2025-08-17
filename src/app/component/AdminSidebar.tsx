'use client';

import Sider from 'antd/es/layout/Sider';
import Image from "next/image";
import Link from "next/link";
import {SunOutlined, AppstoreOutlined} from '@ant-design/icons';
import {Menu} from "antd";
import {Button} from 'antd';
import {Flex} from 'antd';
import {usePathname} from "next/navigation";
import React, {useEffect} from "react";
import theme from "@/config/theme";

export default function AdminSidebar() {

    const items = [
        {
            key: '1',
            label: <Link href='/overview'>Overview </Link>,
            path: '/overview',
            icon: <AppstoreOutlined/>,
        },

        {
            key: '2',
            label: <Link href='/profile'>Profile </Link>,
            path: '/profile',
        },

        {
            key: '3',
            label: <Link href='/product'>Product </Link>,
            path: '/product',

        },


        {
            key: '4',
            label: <Link href='/customers'>Customers </Link>,
            path: '/customers',
        },

        {
            key: '5',
            label: <Link href='/message'>Message </Link>,
            path: '/message',
        },

    ]

    const pathname = usePathname();
    const [selectedKey, setSelectedKey] = React.useState([""]);
    useEffect(() => {
        items.forEach((item) => {
            if (pathname.startsWith(item.path))
                setSelectedKey([item.key]);
        })
    }, [pathname]);


    return (
        <Sider
            width={260}
            style={{
                backgroundColor: theme.token?.colorInfoBg,
            }}
            className='container-admin--sidebar'
        >

            <Flex
                justify="space-between"
                align="center"
                style={{
                    margin: '24px 24px',
                    backgroundColor: theme.token?.colorInfoBg,
                }}
            >
                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={76}
                    height={30}
                    priority
                />

                <Button
                    shape="default"
                    size="middle"
                    icon={<SunOutlined/>}
                    className='btn-outline--small'
                />
            </Flex>

            <Menu items={items}
                  style={{
                      backgroundColor: theme.token?.colorInfoBg,
                  }}
                  selectedKeys={selectedKey}
            > </Menu>

        </Sider>
    );
}