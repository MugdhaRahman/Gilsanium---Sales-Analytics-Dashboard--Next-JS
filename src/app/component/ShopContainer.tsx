// 'use client';
// import {Button, Flex, Input, Select, Typography} from "antd";
// import theme from "@/config/theme";
// import Image from "next/image";
// import {SearchOutlined} from "@ant-design/icons";
// import MapBox from "@/app/component/MapBox";
// import React from "react";
//
// export default function ShopContainer() {
//
//     const resultNumber = "1-8"
//     const totalResults = "8";
//
//     const handleChange = (value: string) => {
//         console.log(`selected ${value}`);
//     };
//
//     return (
//         <Flex vertical
//               align="center"
//               style={{margin: '0 40px 24px 40px', border: `1px solid ${theme.token?.colorBorder}`, borderRadius: 10}}>
//
//             <Flex justify='space-between'
//                   align='center'
//                   style={{padding: 16, width: '100%'}}>
//
//                 <MapBox/>
//
//
//             </Flex>
//
//
//         </Flex>
//     )
// }