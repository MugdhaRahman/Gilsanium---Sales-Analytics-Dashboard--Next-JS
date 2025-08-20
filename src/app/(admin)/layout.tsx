// /app/(admin)/layout.tsx
'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import "../globals.css";
import React from 'react';
import {Layout} from 'antd';
import {Content} from "antd/es/layout/layout";
import {AntdRegistry} from "@ant-design/nextjs-registry"
import {ConfigProvider} from "antd"
import theme from "@/config/theme"
import {store} from "@/store";
import {Provider} from "react-redux";
import AdminSidebar from '@/app/component/AdminSidebar';
import AdminHeader from '@/app/component/AdminHeader';


export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ConfigProvider theme={theme}>
            <AntdRegistry>
                <Provider store={store}>
                    <Layout>
                        <AdminSidebar/>
                        <Layout>
                            <AdminHeader/>
                            <Content>
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                </Provider>
            </AntdRegistry>
        </ConfigProvider>
    );
};

