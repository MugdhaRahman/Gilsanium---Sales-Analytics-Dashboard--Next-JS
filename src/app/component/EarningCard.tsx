// Stats cards component showing key metrics
'use client';
import React from 'react';
import {Avatar, Card, Flex, Space, Typography} from 'antd';
import {MoreOutlined} from "@ant-design/icons";
import {brandColor} from "@/config/theme";

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
                  margin:8,
                  width:"100%",
                  border: `1px solid ${token.colorStroke}`,
                  borderRadius: 10,
              }}
        >
            <Space direction="horizontal"
                   style={{width: "100%", justifyContent: "space-between", padding: '12px 12px 0'}}>
                <Space>
                    {icon && <Avatar icon={icon}/>}
                    <Text strong>{title}</Text>
                </Space>
                <MoreOutlined/>
            </Space>
            <Space direction='horizontal' style={{width: "100%", justifyContent: "start", padding: '12px 12px 0'}}>
                <Title level={3} style={{marginTop: 8, marginRight: 16}}>{'$' + value}</Title>
                <Text style={{
                    background: changeType === "positive" ? token.colorPositiveBg : token.colorErrorBg,
                    borderRadius: 4,
                    color: changeType === "positive" ? token.colorPositiveText : token.colorPositiveText,
                    padding: '4px 8px'
                }}>{change}</Text>
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
                }}>You earn extra {value} this month</Text>
            </Flex>
        </Flex>


    )
};

export default EarningsCard;