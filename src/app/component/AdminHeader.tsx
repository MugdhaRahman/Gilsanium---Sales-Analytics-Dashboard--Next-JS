'use client';

import {Header} from "antd/es/layout/layout";
import Image from "next/image"
import {SearchOutlined, BellOutlined, DownOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {Flex, Divider, Avatar} from 'antd';
import {Typography} from 'antd';
import theme from "@/config/theme";

export default function AdminHeader() {

    const {Title, Paragraph} = Typography;

    return (
        <Header
            style={{
                backgroundColor: theme.token?.colorBgBase,
            }}
            className='container-admin--header'
        >
            <Flex
                vertical
                justify="center"
                align="start"
                style={{
                    marginTop:20,
                }}
            >
                <Title level={2}
                    style={{
                        marginTop: 0,
                        fontWeight: 500,
                    }}
                >Sales Overview</Title>

                <Paragraph
                    style={{
                        marginTop:"-6px",
                        fontSize: '12px',
                        fontWeight: 400,
                        color: theme.token?.colorTextBase,
                    }}
                >Monitor all your content activity</Paragraph>

            </Flex>

            <Flex
                justify="center"
                align="center"
                style={{
                    gap: '6px',
                    marginLeft: 'auto',
                }}
            >

                <Button
                    shape="default"
                    size="middle"
                    icon={<SearchOutlined/>}
                    style={{
                        alignItems: 'center',
                        padding: '8px 8px',
                        color: theme.token?.colorTextBase,
                        borderRadius: '8px',
                        borderColor: theme.token?.colorBorder,
                        backgroundColor: theme.token?.colorBgBase,
                    }}
                />

                <Button
                    shape="default"
                    size="middle"
                    icon={<BellOutlined/>}
                    className='btn-outline--small'
                />

                <Button
                    shape="default"
                    size="middle"
                    icon={<Image
                        src="/filter.svg"
                        alt="logo"
                        width={16}
                        height={16}
                        priority
                    />}
                    className='btn-outline--small'
                />
            </Flex>

            <Flex
                justify="center"
                align="center"
                style={{
                    marginLeft: '20px'
                }}
            >
                <Divider
                    type="vertical"
                    style={{
                        height: '16px',
                        backgroundColor: theme.token?.colorBorder,
                        width: '1px',
                        margin: 0,
                    }}
                />

                <Avatar
                    size={36}
                    icon={<Image
                        src='/user_profile.svg'
                        alt="user profile"
                        width={36}
                        height={36}
                    />}
                    style={{
                        marginLeft: '20px'
                    }}
                />

                <Flex
                    vertical
                    justify="center"
                    align="start"
                    style={{
                        marginLeft: '8px'
                    }}
                >
                    <Title level={3}
                        style={{
                            margin: 0,
                            fontWeight: 500,
                        }}
                    >Amiril mu’</Title>
                    <Paragraph
                        style={{
                            margin: 0,
                            fontSize: '10px',
                            fontWeight: 400,
                            color: theme.token?.colorTextBase,
                        }}
                    >amirilmu@mail.example</Paragraph>

                </Flex>

                <DownOutlined
                    style={{
                        marginLeft: '10px',
                        fontSize: '16px',
                        color: theme.token?.colorTextBase
                    }}/>

            </Flex>
        </Header>

    )
}