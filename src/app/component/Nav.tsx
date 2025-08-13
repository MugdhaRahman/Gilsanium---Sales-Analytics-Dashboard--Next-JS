'use client';

import {Header} from "antd/es/layout/layout";
import Image from "next/image"
import {SearchOutlined, BellOutlined, DownOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {Flex, Divider, Avatar} from 'antd';
import {Typography} from 'antd';
import {brandColor} from "@/config/theme";

export default function Nav() {

    const {Title, Paragraph} = Typography;
    const {token} = brandColor;

    return (
        <Header
            style={{
                top: 20,
                position: 'sticky',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                borderBottom: `1px solid ${token.colorStroke}`,
            }}
        >
            <Flex
                vertical
                justify="center"
                align="start"
                style={{
                    paddingBottom:14,
                }}
            >
                <Title
                    style={{
                        marginTop: 0,
                        fontSize: '18px',
                        fontWeight: 500,
                        color: brandColor.token.colorTextBase,
                    }}
                >Sales Overview</Title>
                <Paragraph
                    style={{
                        marginTop:"-6px",
                        fontSize: '12px',
                        fontWeight: 400,
                        color: brandColor.token.colorTextBase,
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
                        color: token.colorTextBase,
                        borderRadius: '8px',
                        borderColor: token.colorStroke,
                        backgroundColor: token.colorBgBase,
                    }}
                />

                <Button
                    shape="default"
                    size="middle"
                    icon={<BellOutlined/>}
                    style={{
                        alignItems: 'center',
                        padding: '8px 8px',
                        color: token.colorTextBase,
                        borderRadius: '8px',
                        borderColor: token.colorStroke,
                        backgroundColor: token.colorBgBase,
                    }}
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
                    style={{
                        alignItems: 'center',
                        padding: '8px 8px',
                        color: token.colorTextBase,
                        borderRadius: '8px',
                        borderColor: token.colorStroke,
                        backgroundColor: token.colorBgBase,
                    }}
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
                        backgroundColor: token.colorStroke,
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
                    <Title
                        style={{
                            margin: 0,
                            fontSize: '16px',
                            fontWeight: 500,
                            color: brandColor.token.colorTextBase,
                        }}
                    >Amiril mu’</Title>
                    <Paragraph
                        style={{
                            margin: 0,
                            fontSize: '10px',
                            fontWeight: 400,
                            color: brandColor.token.colorTextBase,
                        }}
                    >amirilmu@mail.example</Paragraph>

                </Flex>

                <DownOutlined
                    style={{
                        marginLeft: '10px',
                        fontSize: '16px',
                        color: token.colorTextBase
                    }}/>

            </Flex>
        </Header>

    )
}