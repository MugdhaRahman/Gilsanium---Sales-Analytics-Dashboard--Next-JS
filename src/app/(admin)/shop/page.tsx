'use client'
import {Flex, List, theme, Image, Typography} from "antd";

export default function Shop() {

    const {token} = theme.useToken();

    const {Text} = Typography


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

    return (
        <div style={{margin:24}}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
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
    )
}