'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {Button, Flex, List, Select, Avatar, Typography, Space} from 'antd';
import Image from 'next/image';
import theme from '@/config/theme';

const {Text, Title} = Typography;

type SortKey = 'orders' | 'popular' | 'new' | 'top_selling';

type Product = {
    id: string;
    name: string;
    orders: number;
    image: string;
    // Optional fields for other sorts; safe fallbacks are used
    rating?: number;            // for "popular"
    createdAt?: number;         // timestamp (ms) for "new"
};

const ProductMonitoring: React.FC = () => {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<SortKey>('orders');

    const productMonitoring: Product[] = [
        {id: '1', name: 'Smartwatch', orders: 1500, image: '/Product Image.svg', rating: 4.7, createdAt: 1719792000000},
        {
            id: '2',
            name: 'Speaker',
            orders: 900,
            image: '/Product Image Container.svg',
            rating: 4.2,
            createdAt: 1717200000000
        },
        {
            id: '3',
            name: 'Drone',
            orders: 900,
            image: '/Product Image Container (1).svg',
            rating: 4.9,
            createdAt: 1722384000000
        },
        {
            id: '4',
            name: 'HandPhone',
            orders: 10,
            image: '/Product Image Container (2).svg',
            rating: 3.8,
            createdAt: 1714617600000
        },
    ];

    const sortedProducts = useMemo(() => {
        const arr = [...productMonitoring];
        switch (sortOption) {
            case 'orders':
            case 'top_selling':
                return arr.sort((a, b) => b.orders - a.orders);
            case 'popular':
                return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
            case 'new':
                return arr.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
            default:
                return arr;
        }
    }, [sortOption]);

    // Ensure something is selected; update when sorting changes
    useEffect(() => {
        if (!selectedProductId && sortedProducts.length) {
            setSelectedProductId(sortedProducts[0].id);
        }
    }, [sortedProducts, selectedProductId]);

    const handleProductClick = (productId: string) => setSelectedProductId(productId);
    const handleSortChange = (value: SortKey) => setSortOption(value);

    return (
        <Flex
            vertical
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
                            {sortOption === 'orders' && 'Most Orders'}
                            {sortOption === 'popular' && 'Popular Products'}
                            {sortOption === 'new' && 'New Products'}
                            {sortOption === 'top_selling' && 'Top Selling'}
                        </Text>
                    </Space>

                    <Select<SortKey>
                        value={sortOption}
                        onChange={handleSortChange}
                        style={{width: 140, fontSize: 14, fontWeight: 400}}
                        options={[
                            {value: 'orders', label: 'Orders'},
                            {value: 'popular', label: 'Popular'},
                            {value: 'new', label: 'New'},
                            {value: 'top_selling', label: 'Top Selling'},
                        ]}
                    />
                </Flex>
            </div>

            <List
                dataSource={sortedProducts}
                renderItem={(product, index) => {
                    const isSelected = selectedProductId === product.id;
                    const rank = String(index + 1).padStart(2, '0'); // rank from sorted order
                    return (
                        <List.Item key={product.id} onClick={() => handleProductClick(product.id)}>
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '6px 8px',
                                    borderRadius: 8,
                                    background: isSelected ? '#F6F3FF' : 'transparent',
                                    cursor: 'pointer',
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
                                    {rank}
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

            <Button
                block
                type="link"
                href="/shop"
                style={{
                    textAlign: 'center',
                    color: theme.token?.colorTextBase,
                    opacity: 0.4,
                    fontSize: 12,
                    fontWeight: 400,
                }}
            >
                View all products
            </Button>
        </Flex>
    );
};

export default ProductMonitoring;
