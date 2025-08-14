// 'use client';
//
// import Sider from 'antd/es/layout/Sider';
// import Image from "next/image";
// import Link from "next/link";
// import {SunOutlined,AppstoreOutlined} from '@ant-design/icons';
// import {Menu} from "antd";
// import {brandColor} from "@/config/theme";
// import {Button} from 'antd';
// import {Flex} from 'antd';
// import {usePathname} from "next/navigation";
// import React, {useEffect} from "react";
//
// export default function Slider() {
//
//     const items = [
//         {
//             key: '1',
//             label: <Link href='/'>Overview </Link>,
//             path: '/',
//             icon:<AppstoreOutlined />,
//         },
//
//         {
//             key: '2',
//             label: <Link href='/profile'>Profile </Link>,
//             path: '/profile',
//         },
//
//         {
//             key: '3',
//             label: <Link href='/product'>Product </Link>,
//             path: '/product',
//
//         },
//
//
//         {
//             key: '4',
//             label: <Link href='/customers'>Customers </Link>,
//             path: '/customers',
//         },
//
//         {
//             key: '5',
//             label: <Link href='/message'>Message </Link>,
//             path: '/message',
//         },
//
//     ]
//
//     const pathname = usePathname();
//     const [selectedKey, setSelectedKey] = React.useState([""]);
//     useEffect(() => {
//         items.forEach((item) => {
//             if (pathname.startsWith(item.path))
//                 setSelectedKey([item.key]);
//         })
//     }, [pathname] );
//     const {token} = brandColor;
//     return (
//         <Sider
//             width={260}
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 position: 'sticky',
//                 top: 0,
//                 height: '100vh',
//                 overflowY: 'auto',
//                 scrollbarWidth: 'thin',
//                 scrollbarGutter: 'stable',
//                 backgroundColor: token.colorSliderBG,
//                 border: `1px solid ${token.colorStroke}`,
//             }}
//         >
//
//             <Flex
//                 justify="space-between"
//                 align="center"
//                 style={{
//                     margin: '24px 24px',
//                     backgroundColor: token.colorSliderBG,
//                 }}
//             >
//                 <Image
//                     src="/logo.svg"
//                     alt="logo"
//                     width={76}
//                     height={30}
//                     priority
//                 />
//
//                 <Button
//                     shape="default"
//                     size="middle"
//                     icon={<SunOutlined/>}
//                     style={{
//                         padding: '6px 6px',
//                         fontSize: '16px',
//                         alignItems: 'center',
//                         borderRadius: '6px',
//                         borderColor: token.colorStroke,
//                         backgroundColor: token.colorBgBase,
//                     }}
//                 />
//             </Flex>
//
//             <Menu items={items}
//                   style={{
//                       backgroundColor: token.colorSliderBG,
//                   }}
//                   selectedKeys={selectedKey}
//             > </Menu>
//
//         </Sider>
//     );
// }