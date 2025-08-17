'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { DatePicker, Space, Flex } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { DownOutlined } from '@ant-design/icons';
import theme from "@/config/theme";

export default function SalesChart() {
    const data = useMemo(() => ([
        { name: 'Jan', uv: 1.2, pv: 3.4 },
        { name: 'Feb', uv: 0.5, pv: 0.18 },
        { name: 'Mar', uv: 1.0, pv: 2.5 },
        { name: 'Apr', uv: 0.6, pv: 2.0 },
        { name: 'May', uv: 1.8, pv: 0.7 },
        { name: 'Jun', uv: 0.2, pv: 1.0 },
        { name: 'Jul', uv: 0.9, pv: 1.3 },
        { name: 'Aug', uv: 1.1, pv: 1.7 },
        { name: 'Sep', uv: 0.8, pv: 0.9 },
        { name: 'Oct', uv: 1.4, pv: 1.1 },
        { name: 'Nov', uv: 0.6, pv: 0.8 },
        { name: 'Dec', uv: 1.9, pv: 2.2 },
    ]), []);

    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getViewportWidth = () => {
        if (windowWidth >= 1024) return 480;
        if (windowWidth >= 768) return 350;
        return Math.max(320, windowWidth - 80);
    };
    const viewportWidth = getViewportWidth();

    const COL_WIDTH = 64;
    const CHART_HEIGHT = windowWidth >= 1024 ? 268 : windowWidth >= 768 ? 220 : 200;
    const FULL_WIDTH = data.length * COL_WIDTH;

    const scrollerRef = useRef<HTMLDivElement>(null);

    // Default: March selected & centered
    const [selectedMonth, setSelectedMonth] = useState<string>('Mar');

    // Center March on first render and when viewport changes
    useEffect(() => {
        const idx = data.findIndex(d => d.name === 'Mar');
        if (idx >= 0 && scrollerRef.current) {
            const targetCenter = idx * COL_WIDTH + COL_WIDTH / 2;
            const left = Math.max(0, targetCenter - viewportWidth / 2);
            scrollerRef.current.scrollTo({ left, behavior: 'auto' });
        }
    }, [data, viewportWidth]);

    const onChange: DatePickerProps['onChange'] = (date) => {
        if (!date) {
            setSelectedMonth('Mar');
            const idx = data.findIndex(d => d.name === 'Mar');
            if (idx >= 0 && scrollerRef.current) {
                const targetCenter = idx * COL_WIDTH + COL_WIDTH / 2;
                const left = Math.max(0, targetCenter - viewportWidth / 2);
                scrollerRef.current.scrollTo({ left, behavior: 'smooth' });
            }
            return;
        }
        const m = date.format('MMM');
        setSelectedMonth(m);

        const idx = data.findIndex(d => d.name === m);
        if (idx >= 0 && scrollerRef.current) {
            const targetCenter = idx * COL_WIDTH + COL_WIDTH / 2;
            const left = Math.max(0, targetCenter - viewportWidth / 2);
            scrollerRef.current.scrollTo({ left, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Space
                direction="vertical"
                style={{
                    border: `1px solid ${theme.token?.colorBorder}`,
                    borderRadius: 10,
                    padding: '16px 16px 40px 16px',
                }}
            >
                <Flex justify="start" align="center" style={{ marginBottom: 22 }}>
                    <Image src="/Dual-Sim-Signal-4--Streamline-Ultimate.svg" alt="stats" height={16} width={16} />
                    <span style={{ marginLeft: 6, fontSize: 16, fontWeight: 400, color: theme.token?.colorTextBase }}>
            Sale Analytics
          </span>

                    <Image src="/refundIcon.svg" alt="refund" height={16} width={16} style={{ marginLeft: 'auto' }} />
                    <span style={{ marginLeft: 6, fontSize: 14, fontWeight: 400, color: theme.token?.colorTextBase }}>
            Refaund
          </span>

                    <Image src="/checkoutIcon.svg" alt="checkout" height={16} width={16} style={{ marginLeft: 14 }} />
                    <span style={{ marginLeft: 6, marginRight: 40, fontSize: 14, fontWeight: 400, color: theme.token?.colorTextBase }}>
            Checkout
          </span>

                    <Space>
                        <DatePicker
                            picker="month"
                            onChange={onChange}
                            format="MMMM"
                            suffixIcon={<DownOutlined />}
                            style={{ width: 120 }}
                            defaultValue={dayjs('2025-03-01')}
                        />
                    </Space>
                </Flex>

                {/* Scrollable viewport with hidden scrollbar */}
                <div
                    ref={scrollerRef}
                    className="noScroll"
                    style={{
                        width: viewportWidth,
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        paddingBottom: 6,
                    }}
                >
                    <div style={{ width: FULL_WIDTH }}>
                        <BarChart
                            width={FULL_WIDTH}
                            height={CHART_HEIGHT}
                            data={data}
                            barSize={28}
                            barCategoryGap="30%"
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                interval={0}
                                tick={(props) => {
                                    const { x, y, payload } = props ;
                                    const highlight = payload.value === selectedMonth;
                                    return (
                                        <text
                                            x={x}
                                            y={y + 19}
                                            textAnchor="middle"
                                            fontSize={16}
                                            fontWeight={highlight ? 700 : 500}
                                            fill="#2B3674"
                                            opacity={highlight ? 0.95 : 0.7}
                                        >
                                            {payload.value}
                                        </text>
                                    );
                                }}
                            />
                            <YAxis tickFormatter={(v) => `${Number(v).toFixed(1)}k`} />
                            <Tooltip cursor={{ fill: 'rgba(65, 79, 244, 0.1)' }} />

                            <Bar dataKey="pv" radius={12}>
                                {data.map((entry, idx) => {
                                    const active = entry.name === selectedMonth;
                                    return (
                                        <Cell key={`pv-${idx}`} fill={active ? '#414FF4' : '#FAFAFA'} />
                                    );
                                })}
                            </Bar>

                            <Bar dataKey="uv" fill="#D9D9D933" radius={12} />
                        </BarChart>
                    </div>
                </div>

                {/* Hide scrollbar (WebKit, Firefox, IE/Edge) */}
                <style jsx>{`
          .noScroll {
            -ms-overflow-style: none; /* IE 10+ */
            scrollbar-width: none;    /* Firefox */
          }
          .noScroll::-webkit-scrollbar {
            display: none;            /* Chrome/Safari */
          }
        `}</style>
            </Space>
        </div>
    );
}
