// Stats cards component showing key metrics
'use client';
import React from 'react';
import {Flex, Space, Typography} from 'antd';
import {MoreOutlined} from "@ant-design/icons";
import {brandColor} from "@/config/theme";
import Image from "next/image";

const {Text, Title} = Typography;
const {token} = brandColor;

interface EarningsCardProps {
    title: string;
    value: string;
    change: string;
    changeType: "positive" | "negative";
    icon?: React.ReactNode;
}

const EarningsCard = ({
                          title,
                          value,
                          change,
                          changeType,
                          icon,
                      }: EarningsCardProps) => {


    return (

        <Flex vertical
              justify='start'
              align='center'
              style={{
                  margin: 8,
                  width: "100%",
                  border: `1px solid ${token.colorStroke}`,
                  borderRadius: 10,
              }}
        >
            <Space direction="horizontal"
                   style={{width: "100%", justifyContent: "space-between", padding: '12px 12px 0'}}>
                <Space>
                    {icon}
                    <Text style={{fontSize: 12, fontWeight: 400}}>{title}</Text>
                </Space>
                <MoreOutlined/>
            </Space>
            <Space direction='horizontal' style={{width: "100%", justifyContent: "start", padding: '12px 12px 0'}}>
                <Title level={4} style={{marginTop: 8, marginRight: 16}}>{value}</Title>

                <Flex
                    justify='center'
                    align='center'
                    style={{
                        fontSize: 12,
                        fontWeight: 400,
                        background: changeType === "positive" ? token.colorPositiveBg : token.colorErrorBg,
                        borderRadius: 4
                    }}>
                    <Image src="/Graph-Stats-Descend--Streamline-Ultimate.svg" alt={'stats'}
                           height={12}
                           width={12} style={{
                        marginLeft: 8,
                        color: changeType === "positive" ? token.colorPositiveText : token.colorError,
                    }}
                    />

                    <Text style={{
                        color: changeType === "positive" ? token.colorPositiveText : token.colorError,
                        padding: '0px 8px'
                    }}>{change}</Text>
                </Flex>

            </Space>

            <Flex style={{
                zIndex: 1,
                backgroundColor: token.colorSliderBG,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    padding: '8px 16px',
                    color: token.colorTextBase,
                    fontSize: 12,
                    fontWeight: 400,
                }}>
                    You earn extra <Text strong>{value}</Text> this month
                </Text>

            </Flex>
        </Flex>


    )
};

export default EarningsCard;