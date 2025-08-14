import {Button, Flex} from "antd";
import DateRangePicker from "@/app/component/DateRangePicker";
import Image from "next/image";
import {brandColor} from "@/config/theme";
import {DownloadOutlined} from "@ant-design/icons";
import EarningCard from "@/app/component/EarningCard";

export default function Overview() {

    const {token} = brandColor;

    // Example value
    const earninValue = '$109,000';
    const change = '200';
    const changeType = "positive";

    const totalOrders = '+500';
    const changeOrders = "50";
    const changeOrdersType = "positive";

    const totalSales = "$15000";
    const changeSales = "3000";
    const changeSalesType = "positive";

    const newCustomers = "+300";
    const changeCustomers = "50";
    const changeCustomersType = "positive";

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        }}>

            <Flex
                justify="space-between"
                align="center"
                style={{
                    marginTop: 16,
                    marginLeft: 40,
                    marginRight: 40,
                    marginBottom: 38,
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

                        style={{
                            alignItems: 'center',
                            color: token.colorTextBase,
                            padding: "12px 16px 12px 16px",
                            fontSize: 14,
                            fontWeight: 400,
                            borderRadius: 8,
                            borderColor: token.colorStroke,
                            backgroundColor: token.colorBgBase,
                        }}

                    >
                        Customize Widget
                    </Button>

                    <Button type="primary" icon={<DownloadOutlined/>} size="large"
                            style={{
                                marginLeft: 8,
                                fontSize: 14,
                                fontWeight: 400,
                                padding: "12px 16px 12px 16px"
                            }}>
                        Download
                    </Button>
                </Flex>
            </Flex>

            <Flex justify='space-evenly'
                  align='center'
                  style={{
                      marginLeft: 32,
                      marginRight: 32,
                      marginBottom: 8,
                  }}>
                <EarningCard icon={<Image
                    src="/Money-Bag-Dollar--Streamline-Ultimate.svg"
                    alt="Earnings Icon"
                    width={16}
                    height={16}/>}
                             title={'Monthly Earning'} value={earninValue} change={change}
                             changeType={changeType}/>
                <EarningCard icon={<Image
                    src="/Money-Bag-Dollar--Streamline-Ultimate.svg"
                    alt="Earnings Icon"
                    width={16}
                    height={16}/>} title={'Total Orders'} value={totalOrders} change={changeOrders}
                             changeType={"positive"}/>
                <EarningCard icon={<Image
                    src="/Money-Bag-Dollar--Streamline-Ultimate.svg"
                    alt="Earnings Icon"
                    width={16}
                    height={16}/>} title={'Total Sales'} value={totalSales} change={changeSales}
                             changeType={"negative"}/>
                <EarningCard icon={<Image
                    src="/Money-Bag-Dollar--Streamline-Ultimate.svg"
                    alt="Earnings Icon"
                    width={16}
                    height={16}/>} title={'New Customers'} value={newCustomers} change={changeCustomers}
                             changeType={"negative"}/>
            </Flex>
        </div>
    )
}