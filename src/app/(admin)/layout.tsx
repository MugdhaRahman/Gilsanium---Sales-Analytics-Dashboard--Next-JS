'use client';

import React, { useState } from 'react';
import { Layout } from 'antd';
import { ConfigProvider } from "antd";
import theme from "@/config/theme";
import { Provider } from "react-redux";
import { store } from "@/store";
import AdminSidebar from '@/app/component/AdminSidebar';
import AdminHeader from '@/app/component/AdminHeader';

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <ConfigProvider theme={theme}>
            <Provider store={store}>
                <Layout>
                    {/* Sidebar */}
                    <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

                    {/* Main Content */}
                    <Layout>
                        {/* Header with Toggle Button */}
                        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                        <Layout.Content>
                            {children}
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Provider>
        </ConfigProvider>
    );
}