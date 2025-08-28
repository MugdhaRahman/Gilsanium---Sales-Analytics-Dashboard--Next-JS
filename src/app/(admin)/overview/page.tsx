'use client'
import {Button, Flex} from "antd";
import DateRangePicker from "@/app/component/DateRangePicker";
import Image from "next/image";
import {DownloadOutlined} from "@ant-design/icons";
import EarningCard from "@/app/component/EarningCard";
import Chart from "@/app/component/SalesChart";
import ProductMonitor from "@/app/component/ProductMonitor";
import {theme} from 'antd';
import Mapbox from "@/app/component/MapBox";
// import {useMediaQuery} from "react-responsive";


export default function Overview() {


    // Example value
    const earningValue = '$109,000';
    const change = '5.2%';
    const changeType = "negative";

    const totalOrders = '+500';
    const changeOrders = "3.2%";
    const changeOrdersType = "positive";

    const totalSales = "$15000";
    const changeSales = "3.8%";
    const changeSalesType = "negative";

    const newCustomers = "+300";
    const changeCustomers = "5.5%";
    const changeCustomersType = "positive";

    // const isMobileS = useMediaQuery({maxWidth: 320});
    // const isMobileM = useMediaQuery({minWidth: 321, maxWidth: 425});
    // const isMobileL = useMediaQuery({minWidth: 426, maxWidth: 768});
    // const isTablet = useMediaQuery({minWidth: 769, maxWidth: 1024});
    // const isLaptop = useMediaQuery({minWidth: 1025, maxWidth: 1440});
    // const isDesktop = useMediaQuery({minWidth: 1441});

    const {token} = theme.useToken()


    return (<div style={{
        display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: token.colorBgBase
    }}>

        <Flex
            justify="space-between"
            align="center"
            className={"overview-header"}

        >
            <DateRangePicker/>

            <Flex justify="center"
                  align="center">

                <Button
                    shape="default"
                    size="large"
                    icon={<Image
                        src="/Remote-Access--Streamline-Ultimate.svg"
                        alt="logo"
                        width={24}
                        height={24}
                    />}
                    className={'btn-outline'}
                >
                    Customize Widget
                </Button>

                <Button type="primary" icon={<DownloadOutlined/>} size="large"
                        className={'btn-primary'}

                >
                    Download
                </Button>
            </Flex>
        </Flex>

        <Flex
              className={"card-container"}
        >
            <EarningCard icon={<Image
                src="/Money-Bag-Dollar--Streamline-Ultimate.svg"
                alt="Earnings Icon"
                width={16}
                height={16}/>}
                         title={'Monthly Earning'} value={earningValue} change={change}
                         changeType={changeType}/>
            <EarningCard icon={<Image
                src="/Shipment-Star--Streamline-Ultimate.svg"
                alt="Earnings Icon"
                width={16}
                height={16}/>} title={'Total Orders'} value={totalOrders} change={changeOrders}
                         changeType={changeOrdersType}/>
            <EarningCard icon={<Image
                src="/Shipment-Star--Streamline-Ultimate.svg"
                alt="Earnings Icon"
                width={16}
                height={16}/>} title={'Total Sales'} value={totalSales} change={changeSales}
                         changeType={changeSalesType}/>
            <EarningCard icon={<Image
                src="/Multiple-Users-1--Streamline-Ultimate.svg"
                alt="Earnings Icon"
                width={16}
                height={16}/>} title={'New Customers'} value={newCustomers} change={changeCustomers}
                         changeType={changeCustomersType}/>
        </Flex>

        <Flex className="chart-container">
            <div className="chart-item">
                <Chart/>
            </div>
            <div className="chart-item">
                <ProductMonitor/>
            </div>
        </Flex>

        <Mapbox/>

    </div>)
}