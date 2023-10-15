'use client'
import { AssignCaptain, MarkAsDelivered, IsDelivered } from '@/components/OrderActions';
import Container from '@/components/ui/Container';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react'
// skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// icons
import { IoIosArrowBack } from 'react-icons/io';

interface Props {
    params: {
        order_id: string
    }
}

function OrderPage({ params }: Props) {
    // states
    // url
    const [baseUrl, setBaseUrl] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);
    const [deliveryLoading, setDeliveryLoading] = React.useState<boolean>(false);
    const [order, setOrder] = React.useState<any>({});
    React.useEffect(() => {
        // router
        if (typeof window != 'undefined') {
            setBaseUrl(`${window.location.protocol}//${window.location.host}`);
            // setLoading(true);
            loadOrderInfo();
        }

    }, [])

    const loadOrderInfo = async () => {
        const order = await fetch(`${baseUrl}/api/order/${params.order_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const ordersJson = await order.json();
        setOrder(ordersJson.data);
        setLoading(false);
    }
    // loading skelton, don't use order.id as it will be undefined
    if(loading){
        return (
            <Container >
                <Link href="/order" className="flex flex-row text-center  items-center text-[22px] hover:text-blue-500 hover:underline mb-3" ><IoIosArrowBack size={22} />Order#{params.order_id}</Link>
                <section className="flex flex-col  items-end sm:wd-[90%] md:w-[50%] m-auto">
                    <div className="flex flex-row w-full justify-between items-center">
                        <p>Order Info</p>
                        <Skeleton width={90} />
                    </div>
    
    
                    <Table className={`${!order.captain ? "mt-5" : "mt-2"} mb-10 border`}>
                        <TableBody>
                            <TableRow className="border">
                                <TableHead>Order ID</TableHead>
                                <TableCell><Skeleton width={150} /></TableCell>
                            </TableRow>
                            <TableRow className="border">
                                <TableHead>Item</TableHead>
                                <TableCell ><Skeleton width={150} /></TableCell>
                            </TableRow>
                            <TableRow className="border">
                                <TableHead>Order Total</TableHead>
                                <TableCell className="text-green-500"><Skeleton width={150} /></TableCell>
                            </TableRow>
                            <TableRow className="border">
                                <TableHead>Customer Name</TableHead>
                                <TableCell><Skeleton width={150} /></TableCell>
                            </TableRow>
                            <TableRow className="border">
                                <TableHead>Captain Name</TableHead>
                                <TableCell className={`${!order?.captain && "text-red-500"}`}> <Skeleton width={150} /></TableCell>
                            </TableRow>
                            <TableRow className="border">
                                <TableHead>Customer Longitude </TableHead>
                                <TableCell ><Skeleton width={150} /></TableCell>
                            </TableRow>
                            <TableRow className="border">
                                <TableHead>Customer Latitude </TableHead>
                                <TableCell ><Skeleton width={150} /></TableCell>
                            </TableRow>
                            <TableRow className="border">
                                <TableHead>Ordered at </TableHead>
                                <TableCell ><Skeleton width={150} /></TableCell>
                            </TableRow>
                            <TableRow className="border">
                                <TableHead>Delivered at </TableHead>
                                <TableCell className={`${order?.delivered ? "text-green-500" : "text-red-500"}`}> <Skeleton width={150} /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </section>
                </Container>
        )

    }

    return (
        <Container >
            <Link href="/order" className="flex flex-row text-center  items-center text-[22px] hover:text-blue-500 hover:underline mb-3" ><IoIosArrowBack size={22} />Order#{params.order_id}</Link>
            <section className="flex flex-col  items-end sm:wd-[90%] md:w-[50%] m-auto">
                <div className="flex flex-row w-full justify-between items-center">
                    <p>Order Info</p>
                    {!order.captain && <AssignCaptain

                        baseUrl={baseUrl} orderId={order?.id}
                        reload={loadOrderInfo}

                    />}
                    {!order.delivered && order.captain &&
                        <MarkAsDelivered baseUrl={baseUrl} orderId={order?.id} reload={loadOrderInfo}
                            loading={deliveryLoading} setLoading={setDeliveryLoading}
                        />
                    }
                    {
                        order.delivered ? <p className="text-green-500">Delivered</p> : null
                    }
                </div>


                <Table className={`${!order.captain ? "mt-5" : "mt-2"} mb-10 border`}>
                    <TableBody>
                        <TableRow className="border">
                            <TableHead>Order ID</TableHead>
                            <TableCell>#{order?.id}</TableCell>
                        </TableRow>
                        <TableRow className="border">
                            <TableHead>Item</TableHead>
                            <TableCell >{order?.item?.name}(<Link className="text-blue-600 hover:text-blue-400" href={order?.item?.image ? order?.item?.image : "#"}>View Image</Link>)</TableCell>
                        </TableRow>
                        <TableRow className="border">
                            <TableHead>Order Total</TableHead>
                            <TableCell className="text-green-500">SAR {order?.item?.price}</TableCell>
                        </TableRow>
                        <TableRow className="border">
                            <TableHead>Customer Name</TableHead>
                            <TableCell>{order?.customer?.name}</TableCell>
                        </TableRow>
                        <TableRow className="border">
                            <TableHead>Captain Name</TableHead>
                            <TableCell className={`${!order?.captain && "text-red-500"}`}> <Link className="text-blue-600 hover:text-blue-400" href={`/captain/${order?.captain_id}`}>{order?.captain ? order?.captain.name : "Captain not assigned"}</Link></TableCell>
                        </TableRow>
                        <TableRow className="border">
                            <TableHead>Customer Longitude </TableHead>
                            <TableCell > {order?.customer?.customer_longitude}</TableCell>
                        </TableRow>
                        <TableRow className="border">
                            <TableHead>Customer Latitude </TableHead>
                            <TableCell > {order?.customer?.customer_latitude}</TableCell>
                        </TableRow>
                        <TableRow className="border">
                            <TableHead>Ordered at </TableHead>
                            <TableCell > {new Date(order?.created_at).toUTCString()}</TableCell>
                        </TableRow>
                        <TableRow className="border">
                            <TableHead>Delivered at </TableHead>
                            <TableCell className={`${order?.delivered ? "text-green-500" : "text-red-500"}`}> {order?.delivered ? new Date(order?.delivered_at).toUTCString() : "Not Delivered"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

        </Container>
    )
}

export default OrderPage

/**
 * Order page Design Idea
 * Picture of the order on top left
 * On top right show deleivery status
 * below that show order info
 * 
 */

