// /app/(admin)/layout.tsx
import React from 'react';
import {Layout} from 'antd';
import {Content} from "antd/es/layout/layout";
import {AntdRegistry} from "@ant-design/nextjs-registry"
import {ConfigProvider} from "antd"
import theme from "@/config/theme"
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
                <Layout>
                    <AdminSidebar/>
                    <Layout>
                        <AdminHeader/>
                        <Content>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </AntdRegistry>
        </ConfigProvider>
    );
};

