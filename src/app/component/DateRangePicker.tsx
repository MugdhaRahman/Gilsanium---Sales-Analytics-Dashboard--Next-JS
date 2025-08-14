'use client';
import React, {useState} from 'react';
import Image from "next/image";
import type {DatePickerProps, TimePickerProps} from 'antd';
import {DatePicker, Select, Space, TimePicker} from 'antd';

export default function DateRangePicker() {

    const {Option} = Select;

    type PickerType = 'time' | 'date';

    const PickerWithType = ({
                                type,
                                onChange,
                            }: {
        type: PickerType;
        onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
    }) => {
        if (type === 'time') return <TimePicker onChange={onChange}/>;
        if (type === 'date') return <DatePicker onChange={onChange}/>;
        return <DatePicker picker={type} onChange={onChange}/>;
    };

    const [type, setType] = useState<PickerType>('time');


    return (
        <Space>
            <Select
                style={{
                    alignItems: 'center',
                }}
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
                </div>} aria-label="Picker Type" value={type} onChange={setType}>
                <Option value="time">Time</Option>
                <Option value="date">Date</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
                <Option value="quarter">Quarter</Option>
                <Option value="year">Year</Option>
            </Select>
            <PickerWithType type={type} onChange={(value) => console.log(value)}/>
        </Space>
    );
}