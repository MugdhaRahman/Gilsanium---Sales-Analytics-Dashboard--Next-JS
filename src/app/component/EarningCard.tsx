// Stats cards component showing key metrics
'use client';
import React, {useMemo} from 'react';
import {Flex, Space, Typography} from 'antd';
import {FallOutlined, MoreOutlined, RiseOutlined} from "@ant-design/icons";
import Image from "next/image";
import theme from "@/config/theme";

const {Text, Title} = Typography;

const changePositive = "positive";
const changeNegative = "negative";


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

    const changeIcon = useMemo(
        () =>
            changeType === 'positive' ? (
                <RiseOutlined style={{color: theme.token?.colorSuccessText}}/>
            ) : (
                <FallOutlined style={{color: theme.token?.colorError}}/>
            ),
        [changeType]
    );


    return (

        <Flex vertical
              justify='start'
              align='center'

              style={{
                  margin: 8,
                  width: "100%",
                  backgroundColor: theme.token?.colorInfoBg,
                  border: `1px solid ${theme.token?.colorBorder}`,
                  borderRadius: 10,
              }}
        >
            <Flex vertical
                  justify='start'
                  align='center' style={{
                width: '100%',
                backgroundColor: theme.token?.colorBgContainer,
                borderRadius: '10px',
            }}>

                <Space direction="horizontal"
                       style={{width: "100%", justifyContent: "space-between", padding: '12px 12px 0'}}>
                    <Space>
                        {icon}
                        <Title level={4} style={{fontWeight: 400}}>{title}</Title>
                    </Space>
                    <MoreOutlined/>
                </Space>
                <Space direction='horizontal' style={{
                    width: "100%",
                    justifyContent: "start",
                    padding: '12px 12px 0',
                }}>
                    <Title level={1} style={{marginTop: 8, marginRight: 16}}>{value}</Title>

                    <Flex
                        justify='center'
                        align='center'
                        style={{
                            background: changeType === "positive" ? theme.token?.colorSuccessBg : theme.token?.colorErrorBg,
                            borderRadius: 4
                        }}>
                        <Space style={{
                            paddingLeft: 8
                        }}>
                            {changeIcon}
                        </Space>


                        <Text style={{
                            color: changeType === "positive" ? theme.token?.colorSuccessText : theme.token?.colorError,
                            padding: '0px 8px'
                        }}>{change}</Text>
                    </Flex>

                </Space>

            </Flex>


            <Text
                style={{
                    padding: '8px 16px',
                    color: theme.token?.colorTextBase,
                    fontSize: theme.token?.fontSizeHeading4,
                    fontWeight: 400,
                }}>
                You earn extra <Text strong>{value}</Text> this month
            </Text>

        </Flex>


    )
};

export default EarningsCard;