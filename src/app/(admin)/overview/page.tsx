import {Button, Flex} from "antd";
import DateRangePicker from "@/app/component/DateRangePicker";
import Image from "next/image";
import {DownloadOutlined} from "@ant-design/icons";
import EarningCard from "@/app/component/EarningCard";
import Chart from "@/app/component/SalesChart";
import ProductMonitor from "@/app/component/ProductMonitor";
import theme from "@/config/theme";
import Mapbox from "@/app/component/MapBox";

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

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: theme.token?.colorBgBase
        }}>

            <Flex
                justify="space-between"
                align="center"
                style={{
                    margin: '20px 40px 24px 40px',
                }}
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
                        style={{marginRight: 8}}
                        className={'btn-outline'}
                    >
                        Customize Widget
                    </Button>

                    <Button type="primary" icon={<DownloadOutlined/>} size="large"
                    >
                        Download
                    </Button>

                </Flex>
            </Flex>

            <Flex justify='space-evenly'
                  align='center'
                  style={{
                      margin: '0 32px 24px 32px'
                  }}>
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

            <Flex gap={15} style={{margin: '0 40px 24px 40px'}}>
                <div style={{flex: 1}}>
                    <Chart/>
                </div>
                <div style={{flex: 1}}>
                    <ProductMonitor/>
                </div>
            </Flex>

            <Mapbox/>

        </div>
    )
}