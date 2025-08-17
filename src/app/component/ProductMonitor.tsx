'use client';

import React, {useState} from 'react';
import {Card, Select, List, Avatar, Typography, Button, Flex, Space} from 'antd';
import Image from "next/image";
import theme from "@/config/theme";

const {Text, Title} = Typography;

const ProductMonitoring: React.FC = () => {
        const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
        const [sortOption, setSortOption] = useState<'orders' | 'popular' | 'new' | 'top_selling'>('orders');

        const productMonitoring = [
            {id: '1', name: 'Smartwatch', orders: 1500, image: '/Product Image.svg'},
            {id: '2', name: 'Speaker', orders: 900, image: '/Product Image Container.svg'},
            {id: '3', name: 'Drone', orders: 900, image: '/Product Image Container (1).svg'},
            {id: '4', name: 'HandPhone', orders: 10, image: '/Product Image Container (2).svg'},
        ];

        const handleProductClick = (productId: string) => {
            setSelectedProductId(productId);
        };

        const handleSortChange = (value: 'orders' | 'popular' | 'new' | 'top_selling') => {
            setSortOption(value);
        };

        return (
            <Flex vertical
                  justify="start"
                  align="stretch"
                  style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: theme.token?.colorBgContainer,
                      border: `1px solid ${theme.token?.colorBorder}`,
                      borderRadius: 10,
                      padding: 16,
                  }}
            >
                <div>
                    <Flex align="start" justify="space-between" style={{marginBottom: 0}}>
                        <Space direction="vertical" style={{alignItems: 'flex-start'}}>
                            <Space align="center">
                                <Image
                                    src="/Startup-Product-Rocket-Box--Streamline-Ultimate.svg"
                                    alt="icon"
                                    height={24}
                                    width={24}
                                />
                                <Title level={3} style={{fontWeight: 500}}>
                                    Product Monitoring
                                </Title>
                            </Space>
                            <Text style={{opacity: 0.5, fontSize: 12}}>
                                Popular Product
                            </Text>
                        </Space>
                        <Select value={sortOption} onChange={handleSortChange}
                                style={{width: 100, fontSize: 14, fontWeight: 400}}>
                            <Select.Option value="orders">Orders</Select.Option>
                            <Select.Option value="popular">Popular</Select.Option>
                            <Select.Option value="new">New</Select.Option>
                            <Select.Option value="top_selling">Top Selling</Select.Option>
                        </Select>
                    </Flex>
                </div>

                <List
                    dataSource={productMonitoring}
                    renderItem={(product, index) => {
                        const isSelected = selectedProductId === product.id;
                        return (
                            <List.Item
                                key={product.id}
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '6px 8px',
                                        borderRadius: 8,
                                        background: isSelected ? '#F6F3FF' : 'transparent',
                                    }}
                                >
                                    {isSelected && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                top: 6,
                                                bottom: 6,
                                                width: 8,
                                                borderTopRightRadius: 8,
                                                borderBottomRightRadius: 8,
                                                background: '#7B61FF',
                                            }}
                                        />
                                    )}

                                    {/* Rank */}
                                    <Text
                                        style={{
                                            width: 24,
                                            textAlign: 'center',
                                            fontWeight: 500,
                                            fontSize: 16,
                                            color: isSelected ? '#2B3674' : '#9CA3AF',
                                            marginLeft: isSelected ? 6 : 0,
                                            zIndex: 1,
                                        }}
                                    >
                                        {String(product.id).padStart(2, '0')}
                                    </Text>

                                    {/* Image */}
                                    <Avatar
                                        shape="square"
                                        size={32}
                                        src={product.image}
                                        style={{borderRadius: 8, margin: '0 12px', zIndex: 1}}
                                    />

                                    {/* Name */}
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: '#2B3674',
                                            fontWeight: 500,
                                            fontSize: 12,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            zIndex: 1,
                                        }}
                                    >
                                        {product.name}
                                    </Text>

                                    {/* Orders */}
                                    <Text
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 12,
                                            color: isSelected ? '#7B61FF' : '#9CA3AF',
                                            marginLeft: 8,
                                            zIndex: 1,
                                        }}
                                    >
                                        {product.orders.toLocaleString()} Orders
                                    </Text>
                                </div>
                            </List.Item>
                        );
                    }}
                />
                <Button block type="link" href="/shop" style={{
                    textAlign: 'center',
                    color: theme.token?.colorTextBase,
                    opacity: 0.4,
                    fontSize: 12,
                    fontWeight: 400
                }}>
                    View all products
                </Button>
            </Flex>
        )
    }
;

export default ProductMonitoring;

