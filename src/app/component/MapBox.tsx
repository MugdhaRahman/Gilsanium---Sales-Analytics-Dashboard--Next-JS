'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Input, Button, Typography, Flex, Select, Image, List, Modal, DatePicker } from 'antd';
import Icon, { SearchOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { Text } from 'recharts';
import type { GetProps } from 'antd';
import dayjs from 'dayjs';

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
mapboxgl.accessToken = 'pk.eyJ1IjoibXVnZGhhcmFobWFuIiwiYSI6ImNtZWk5ZG15MjA1YzIycXNqaTJ1OHkzdTYifQ.wjY2T9Ax631IflxgEPRWDg';

const INITIAL_CENTER: [number, number] = [-122.431297, 37.773972];
const INITIAL_ZOOM = 12;

const storeLocations = [
    { id: '1', name: 'Store A', lat: 37.7804852, lng: -122.4724717, price: '$1.2m', address: 'Richmond District' },
    { id: '2', name: 'Store B', lat: 37.753972, lng: -122.461297, price: '$1.2m', address: 'Inner Sunset' },
    { id: '3', name: 'Store C', lat: 37.788536, lng: -122.487397, price: '$1.2m', address: 'Sea Cliff' },
    { id: '4', name: 'Store D', lat: 37.773972, lng: -122.431297, price: '$890k', address: '123 Main St, New York, NY' },
];

const storeItems = [
    { name: 'Laptop', price: '$1,240', image: '/laptop.svg', alt: 'laptop' },
    { name: 'bag', price: '$1,240', image: '/bag.svg', alt: 'laptop' },
    { name: 'monitor', price: '$1,240', image: '/monitor.svg', alt: 'laptop' },
    { name: 'phone', price: '$1,240', image: '/phone.svg', alt: 'laptop' },
];

export default function Mapbox() {
    const { token } = theme.useToken();

    type CustomIconComponentProps = GetProps<typeof Icon>;
    const dateFormat = 'YYYY-MM-DD';

    const SettingSvg = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7H6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 17H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 17H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 7H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z"
                stroke="white"
                strokeWidth="1.5"
            />
            <path
                d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z"
                stroke="white"
                strokeWidth="1.5"
            />
        </svg>
    );

    const SortSvg = () => (
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0.5L7.4641 5H0.535898L4 0.5Z" fill="#2B3674" />
            <path d="M4 13.5L0.535898 9H7.4641L4 13.5Z" fill="#2B3674" />
        </svg>
    );

    const SortIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={SortSvg} {...props} />;
    const SettingIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={SettingSvg} {...props} />;

    // const resultNumber = '1-8';
    // const totalResults = '8';

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    // Use searchTerm and handleSearch in the input (fixes unused warnings)
    const [searchTerm, setSearchTerm] = useState('');

    // Initialize Map
    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/light-v11',
                center: INITIAL_CENTER,
                zoom: INITIAL_ZOOM,
            });

            // Add markers once when style loads
            mapRef.current.on('style.load', () => {
                if (!mapRef.current) return;

                storeLocations.forEach((store) => {
                    const markerElement = document.createElement('div');
                    markerElement.className = 'custom-marker';
                    markerElement.innerHTML = `
            <div class="marker-content">
              <div class="marker-name">${store.name}</div>
              <div class="marker-price">${store.price ?? ''}</div>
            </div>
          `;

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <h3>${store.name}</h3>
            <p>${store.address}</p>
            ${store.price ? `<p>Price: ${store.price}</p>` : ''}
          `);

                     new mapboxgl.Marker(markerElement)
                        .setLngLat([store.lng, store.lat])
                        .setPopup(popup)
                        .addTo(mapRef.current!);

                    // Optional: open popup on click
                    markerElement.addEventListener('click', () => {
                        popup.addTo(mapRef.current!);
                    });
                });
            });
        }

        // Cleanup map on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // ✅ no storeLocations dependency (constant array outside component)

    // Search by store name
    const handleSearch = () => {
        const store = storeLocations.find((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (store && mapRef.current) {
            mapRef.current.flyTo({
                center: [store.lng, store.lat],
                zoom: 14,
                duration: 1000,
            });
        }
    };

    // Modal handling
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    return (
        <Flex
            vertical
            align="center"
            style={{ margin: '0 40px 40px 40px', border: `1px solid ${token.colorBorder}`, borderRadius: 10 }}
        >
            <Flex justify="start" align="center" style={{ padding: 16, width: '100%' }}>
                <Select
                    size="large"
                    defaultValue="For Sale"
                    suffixIcon={<SortIcon />}
                    onChange={handleChange}
                    options={[
                        { value: 'sale', label: 'For Sale' },
                        { value: 'soldOut', label: 'Sold Out' },
                        { value: 'bestSale', label: 'Best Sale' },
                    ]}
                />

                <Input
                    size="large"
                    placeholder="Search Shop"
                    allowClear
                    style={{ margin: '0 8px', flex: 1 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onPressEnter={handleSearch}
                    suffix={<SearchOutlined style={{ fontSize: 16, cursor: 'pointer' }} onClick={handleSearch} />}
                />

                <Button
                    shape="default"
                    size="large"
                    icon={<SettingIcon />}
                    onClick={showModal}
                    style={{
                        background: token.colorTextBase,
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />

                <Modal
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    getContainer={false}
                    style={{
                        border: 1,
                        borderColor: token.colorBorder,
                        fontWeight: 500,
                    }}
                >
                    <Text
                        style={{
                            color: '#555E67',
                            fontSize: token.fontSizeHeading4,
                        }}
                    >
                        Filter by:
                    </Text>

                    <Flex justify="space-between" align="center" style={{ padding: 16, width: '100%' }}>
                        <Typography.Title style={{ fontSize: token.fontSizeHeading3, fontWeight: 600 }}>Date Range</Typography.Title>
                        <Typography.Title style={{ fontSize: token.fontSizeHeading3, fontWeight: 600 }}>Reset</Typography.Title>
                    </Flex>

                    <Flex justify="start" align="center" style={{ padding: 16 }}>
                        <DatePicker
                            defaultValue={dayjs('2019-09-03', dateFormat)}
                            // AntD uses disabledDate, not minDate/maxDate
                            style={{ marginRight: 18 }}
                        />
                        <DatePicker defaultValue={dayjs('2019-09-03', dateFormat)} />
                    </Flex>

                    <Typography.Title style={{ fontSize: token.fontSizeHeading4, fontWeight: 400 }}>
                        Failed to create desire modal with AntD
                    </Typography.Title>
                </Modal>
            </Flex>

            <Flex justify="space-between" align="center" style={{ padding: 16, width: '100%' }}>
                <Typography.Title style={{ fontSize: token.fontSizeHeading3, fontWeight: 600 }}>
                    1-8 of 8 Results
                </Typography.Title>

                <Select
                    size="large"
                    defaultValue="Default Sort"
                    suffixIcon={<SortIcon />}
                    onChange={handleChange}
                    options={[
                        { value: 'default', label: 'Default Sort' },
                        { value: 'new', label: 'New' },
                        { value: 'popular', label: 'Popular' },
                        { value: 'topSelling', label: 'Top Selling' },
                    ]}
                />
            </Flex>

            <Flex justify="center" align="start" style={{ padding: 16 }}>
                <div ref={mapContainerRef} style={{ width: '50%', height: '785px', borderRadius: '8px' }} />

                <div style={{ width: '50%', marginLeft: 16 }}>
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
                        dataSource={storeItems}
                        renderItem={(item) => (
                            <List.Item>
                                <div style={{ position: 'relative', width: '100%' }}>
                                    <Image alt={item.alt} src={item.image} style={{ width: '100%', height: 'auto' }} />
                                    <Flex
                                        vertical
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            zIndex: 1,
                                            background: token.colorTextBase,
                                            opacity: 0.7,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            padding: 16,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: token.fontSizeHeading3,
                                                color: token.colorBgBase,
                                                zIndex: 10,
                                                marginBottom: 4,
                                                position: 'relative',
                                            }}
                                        >
                                            {item.name}
                                        </Text>

                                        <Typography.Title
                                            style={{
                                                fontSize: token.fontSizeHeading1,
                                                color: token.colorBgBase,
                                                zIndex: 10,
                                                margin: 0,
                                                position: 'relative',
                                            }}
                                        >
                                            {item.price}
                                        </Typography.Title>
                                    </Flex>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Flex>
        </Flex>
    );
}
