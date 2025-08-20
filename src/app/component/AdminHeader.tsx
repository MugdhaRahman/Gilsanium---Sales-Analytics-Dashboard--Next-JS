"use client";

import {Avatar, Skeleton, Typography, Flex, Button, Divider} from 'antd';
import {useAppwriteUser} from '@/hooks/useAppwriteUser';
import theme from "@/config/theme";
import {Header} from "antd/es/layout/layout";
import {BellOutlined, DownOutlined, SearchOutlined} from "@ant-design/icons";
import Image from "next/image";

// Gravatar URL generator
function getGravatarUrl(email: string, size: number = 36): string {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const md5 = require('md5');
    const emailHash = md5(email.trim().toLowerCase());

    return `https://www.gravatar.com/avatar/${emailHash}?d=identicon&s=${size}`;
}

export default function AdminHeader() {
    const {Title, Paragraph} = Typography;
    const {user, loading} = useAppwriteUser();

    return (
        <Header style={{backgroundColor: theme.token?.colorBgBase}} className="container-admin--header">
            {/* Left Side */}
            <Flex vertical justify="center" align="start" style={{marginTop: 20}}>
                <Title level={2} style={{marginTop: 0, fontWeight: 500}}>Sales Overview</Title>
                <Paragraph
                    style={{marginTop: "-6px", fontSize: '12px', fontWeight: 400, color: theme.token?.colorTextBase}}>
                    Monitor all your content activity
                </Paragraph>
            </Flex>

            {/* Right Side */}
            <Flex justify="center" align="center" style={{gap: '6px', marginLeft: 'auto'}}>
                <Button shape="default" size="middle" icon={<SearchOutlined/>} style={{
                    alignItems: 'center',
                    padding: '8px 8px',
                    color: theme.token?.colorTextBase,
                    borderRadius: '8px',
                    borderColor: theme.token?.colorBorder,
                    backgroundColor: theme.token?.colorBgBase,
                }}/>
                <Button shape="default" size="middle" icon={<BellOutlined/>} className="btn-outline--small"/>
                <Button shape="default" size="middle"
                        icon={<Image src="/filter.svg" alt="logo" width={16} height={16} priority/>}
                        className="btn-outline--small"/>
            </Flex>

            {/* User Info Section */}
            <Flex justify="center" align="center" style={{marginLeft: '20px'}}>
                <Divider type="vertical" style={{
                    height: '16px',
                    backgroundColor: theme.token?.colorBorder,
                    width: '1px',
                    margin: 0,
                }}/>

                {/* Show Skeleton or Avatar */}
                {loading ? (
                    <Skeleton.Avatar active size={36}/>
                ) : (
                    <>
                        <Avatar
                            size={36}
                            src={user ? getGravatarUrl(user.email) : "/user_profile.svg"} // Fallback to default if no Gravatar
                            style={{marginLeft: '20px'}}
                        />
                        <Flex vertical justify="center" align="start" style={{marginLeft: '8px'}}>
                            <Title level={3} style={{margin: 0, fontWeight: 500}}>
                                {user?.name || "Unknown User"}
                            </Title>
                            <Paragraph style={{
                                margin: 0,
                                fontSize: '10px',
                                fontWeight: 400,
                                color: theme.token?.colorTextBase,
                            }}>
                                {user?.email}
                            </Paragraph>
                        </Flex>
                        <DownOutlined style={{
                            marginLeft: '10px',
                            fontSize: '16px',
                            color: theme.token?.colorTextBase
                        }}/>
                    </>
                )}
            </Flex>
        </Header>
    );
}
