
import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import {Input, Button, Typography, Flex, Select, Image, List, Modal} from "antd";
import Icon, {SearchOutlined} from "@ant-design/icons";
import {theme} from 'antd';
import {Text} from "recharts";
import type {GetProps} from 'antd';


// mapboxgl.accessToken = process.env.mapboxAccessToken;
mapboxgl.accessToken = "pk.eyJ1IjoibXVnZGhhcmFobWFuIiwiYSI6ImNtZWk5ZG15MjA1YzIycXNqaTJ1OHkzdTYifQ.wjY2T9Ax631IflxgEPRWDg";

const INITIAL_CENTER: [number, number] = [-122.431297, 37.773972];
const INITIAL_ZOOM = 12;

const storeLocations = [
    {
        id: "1",
        name: "Store A",
        lat: 37.7804852,
        lng: -122.4724717,
        price: "$1.2m",
        address: "Richmond District"

    },
    {
        id: "2",
        name: "Store B",
        lat: 37.753972,
        lng: -122.461297,
        price: "$1.2m",
        address: "Inner Sunset"

    },
    {
        id: "3",
        name: "Store C",
        lat: 37.788536,
        lng: -122.487397,
        price: "$1.2m",
        address: "Sea Cliff"
    },

    {
        id: "4",
        name: "Store D",
        lat: 37.773972,
        lng: -122.431297,
        address: "123 Main St, New York, NY",
        price: "$890k",
    },

];

const storeItems = [
    {
        name: 'Laptop',
        price: '$1,240',
        image: '/laptop.svg',
        alt: 'laptop'
    },
    {
        name: 'bag',
        price: '$1,240',
        image: '/bag.svg',
        alt: 'laptop'

    },
    {
        name: 'monitor',
        price: '$1,240',
        image: '/monitor.svg',
        alt: 'laptop'

    },
    {
        name: 'phone',
        price: '$1,240',
        image: '/phone.svg',
        alt: 'laptop'

    }
]

export default function Mapbox() {

    const {token} = theme.useToken()

    type CustomIconComponentProps = GetProps<typeof Icon>;

    const SettingSvg = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7H6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 17H9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 17H21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 7H21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z"
                stroke="white" stroke-width="1.5"/>
            <path
                d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z"
                stroke="white" stroke-width="1.5"/>
        </svg>

    );


    const SettingIcon = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={SettingSvg} {...props} />
    );


    const resultNumber = "1-8"
    const totalResults = "8";

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };


    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Initialize Map
    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/light-v11",
                center: INITIAL_CENTER,
                zoom: INITIAL_ZOOM,
            });

            mapRef.current.on("load", () => {
                setLoading(false); // Set loading to false once the map is loaded
            });
        }

        // Cleanup map on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Handle search for store by name
    const handleSearch = () => {
        const store = storeLocations.find((store) =>
            store.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (store && mapRef.current) {
            mapRef.current.flyTo({
                center: [store.lng, store.lat],
                zoom: 14,
                duration: 1000,
            });
        }
    };

    // Add store markers and popups to map
    useEffect(() => {
        if (mapRef.current && mapRef.current.isStyleLoaded()) {
            storeLocations.forEach((store) => {
                if (mapRef.current) {
                    const markerElement = document.createElement("div");
                    markerElement.className = "custom-marker";

                    // Custom marker HTML with store name and price
                    markerElement.innerHTML = `
            <div class="marker-content">
              <div class="marker-name">${store.name}</div>
              <div class="marker-price">${store.price}</div>
            </div>
          `;

                    // Create and add the marker
                    new mapboxgl.Marker(markerElement)
                        .setLngLat([store.lng, store.lat])
                        .addTo(mapRef.current);

                    // Create a popup for the marker
                    const popup = new mapboxgl.Popup({offset: 25})
                        .setHTML(`
              <h3>${store.name}</h3>
              <p>${store.address}</p>
              <p>Price: ${store.price}</p>
            `);

                    // Attach popup to marker
                    markerElement.addEventListener("click", () => {
                        if (mapRef.current) {
                            new mapboxgl.Marker(markerElement)
                                .setPopup(popup)
                                .addTo(mapRef.current);
                        }
                    });
                }
            });
        }
    }, [storeLocations]);

    // Modal handling

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Flex vertical
              align="center"
              style={{margin: '0 40px 40px 40px', border: `1px solid ${token.colorBorder}`, borderRadius: 10}}>

            <Flex
                justify="start"
                align="center"
                style={{padding: 16, width: "100%"}}
            >
                <Select
                    size="large"
                    defaultValue="For Sale"
                    suffixIcon={
                        <Image src="/filter_up_down.svg" alt="filter" width={8} height={13}/>
                    }
                    onChange={handleChange}
                    options={[
                        {value: "sale", label: "For Sale"},
                        {value: "soldOut", label: "Sold Out"},
                        {value: "bestSale", label: "Best Sale"},
                    ]}
                />

                <Input
                    size="large"
                    placeholder="Search Shop"
                    allowClear
                    style={{margin: "0 8px", flex: 1}}
                    suffix={<SearchOutlined style={{fontSize: 16, cursor: "pointer"}}/>}
                />

                <Button
                    shape="default"
                    size="large"
                    icon={
                        <SettingIcon/>
                    }
                    onClick={showModal}
                    style={{
                        background: token.colorTextBase,
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                />

                <Modal
                    closable={{'aria-label': 'Custom Close Button'}}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    getContainer={false}
                    style={{
                        border: 1,
                        borderColor: token.colorBorder,
                        fontWeight: 500
                    }}
                >
                    <Text style={{
                        color: "#555E67",
                        fontSize: token.fontSizeHeading4,
                    }}>
                        Filter by:
                    </Text>

                    <Flex
                        justify="space-between"
                        align="center"
                        style={{padding: 16, width: "100%"}}
                    >

                        <Typography.Title
                            style={{
                                fontSize: token.fontSizeHeading3,
                                fontWeight: 600,
                            }}
                        >
                            Date Range
                        </Typography.Title>

                        <Typography.Title
                            style={{
                                fontSize: token.fontSizeHeading3,
                                fontWeight: 600,
                            }}
                        >
                            Reset
                        </Typography.Title>

                    </Flex>


                </Modal>

            </Flex>

            <Flex
                justify="space-between"
                align="center"
                style={{padding: 16, width: "100%"}}
            >

                <Typography.Title
                    style={{
                        fontSize: token.fontSizeHeading3,
                        fontWeight: 600,
                    }}
                >
                    {resultNumber} of {totalResults} Results
                </Typography.Title>


                <Select
                    size="large"
                    defaultValue="Default Sort"
                    suffixIcon={
                        <Image src="/filter_up_down.svg" alt="filter" width={8} height={13}/>
                    }
                    onChange={handleChange}
                    options={[
                        {value: "default", label: "Default Sort"},
                        {value: "new", label: "New"},
                        {value: "popular", label: "Popular"},
                        {value: "topSelling", label: "Top Selling"}
                    ]}
                />

            </Flex>

            <Flex justify='center'
                  align='start'
                  style={{padding: 16}}>

                <div
                    ref={mapContainerRef}
                    style={{width: "50%", height: "785px", borderRadius: "8px"}}
                />

                <div style={{width: '50%', marginLeft: 16}}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 2,
                            xxl: 2,
                        }}
                        dataSource={storeItems}
                        renderItem={(item) => (
                            <List.Item>

                                <div style={{position: 'relative', width: '100%'}}>
                                    <Image alt={item.alt} src={item.image} style={{width: '100%', height: 'auto'}}/>

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
                                            padding: 16
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: token.fontSizeHeading3,
                                                color: token.colorBgBase,
                                                zIndex: 10,
                                                marginBottom: 4,
                                                position: 'relative'
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
                                                position: 'relative'
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
