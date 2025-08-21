'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import {DatePicker, Select, Space, TimePicker, Typography} from 'antd';
import type {DatePickerProps} from 'antd';

export default function DateRangePicker() {
    type PickerType = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';

    const [type, setType] = useState<PickerType>('month'); // default to Month
    const [startMonth, setStartMonth] = useState<DatePickerProps['value']>();
    const [endMonth, setEndMonth] = useState<DatePickerProps['value']>();

    const handleStartChange: DatePickerProps['onChange'] = (value) => {
        setStartMonth(value);
        console.log('Start Month:', value?.format('YYYY-MM'));
    };

    const handleEndChange: DatePickerProps['onChange'] = (value) => {
        setEndMonth(value);
        console.log('End Month:', value?.format('YYYY-MM'));
    };
    // <Select
    //     style={{
    //         alignItems: 'center',
    //     }}
    //     prefix={<div style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         paddingRight: '8px',
    //     }}>
    //         <Image
    //             src="/Calendar-Edit-1--Streamline-Ultimate.svg"
    //             alt="logo"
    //             width={24}
    //             height={24}
    //         />
    //     </div>} aria-label="Picker Type" value={type} onChange={setType}>
    return (
        <Space>
            <Select
                value={type}
                onChange={setType}
                style={{alignItems: 'center',marginRight:12}}
                prefix={<div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: '8px',
                }}>
                    <Image
                        src="/Calendar-Edit-1--Streamline-Ultimate.svg"
                        alt="logo"
                        width={24}
                        height={24}
                    />
                </div>}
                options={[
                    {value: 'time', label: 'Time'},
                    {value: 'date', label: 'Date'},
                    {value: 'week', label: 'Week'},
                    {value: 'month', label: 'Month'},
                    {value: 'quarter', label: 'Quarter'},
                    {value: 'year', label: 'Year'},
                ]}
            />

            {type === 'time' ? (
                <TimePicker onChange={(v) => console.log('Time:', v)}/>
            ) : type === 'month' ? (
                <Space>
                    <DatePicker
                        picker="month"
                        placeholder="Month"
                        value={startMonth}
                        onChange={handleStartChange}
                        style={{width:96}}
                    />

                    <Typography.Title style={{alignItems: 'center', fontSize: 16, fontWeight: 400,marginTop:8}}>
                        To
                    </Typography.Title>

                    <DatePicker
                        picker="month"
                        placeholder="Month"
                        value={endMonth}
                        onChange={handleEndChange}
                        style={{width:96}}
                        disabledDate={(current) =>
                            startMonth ? current.isBefore(startMonth, 'month') : false
                        }
                    />
                </Space>
            ) : (
                <DatePicker
                    picker={type}
                    onChange={(v) => console.log(`${type}:`, v)}
                />
            )}
        </Space>
    );
}
