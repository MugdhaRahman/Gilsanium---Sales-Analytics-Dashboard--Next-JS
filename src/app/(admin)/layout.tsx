// /app/(admin)/layout.tsx
import React from 'react';
import {Layout} from 'antd';
import {Content} from "antd/es/layout/layout";
import {ConfigProvider} from 'antd';
import AdminSidebar from '@/app/component/AdminSidebar';
import AdminHeader from '@/app/component/AdminHeader';
import {brandColor} from "@/config/theme";


export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Layout hasSider style={{minHeight: '100vh'}}>
            <AdminSidebar/>
            <Layout>
                <AdminHeader/>
                <Content style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'start',
                        backgroundColor: brandColor.token.colorBgBase,
                    }
                }>
                    <ConfigProvider theme={brandColor}>
                        {children}
                    </ConfigProvider>
                </Content>
            </Layout>
        </Layout>
    );
};

