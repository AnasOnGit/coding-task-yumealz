'use client'
import React, { ReactElement } from 'react'
// table component
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Container from '@/components/ui/Container'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import Link from 'next/link'



// icons
import { FiSave } from "react-icons/fi"
import { AiOutlineEye } from 'react-icons/ai';
import { AssignCaptain, IsDelivered, MarkAsDelivered } from '@/components/OrderActions';
interface Props {

}



function Orders({ }: Props) {
    // states
    // Top loading state
    const [loading, setLoading] = React.useState<boolean>(true);
    // Bottom loading state
    const [bottomLoading, setBottomLoading] = React.useState<boolean>(false);
    const [orders, setOrders] = React.useState<any>([]);
    const [captain, setCaptain] = React.useState<any>([]);
    const [assignCaptainDialogOpen, setAssignCaptainDialogOpen] = React.useState<boolean>(false);
    const [selectedAssignedCaptain, setSelectedAssignedCaptain] = React.useState<string>("");
    const [assignLoading, setAssignLoading] = React.useState<boolean>(false);
    const [disableOtherActions, setDisableOtherActions] = React.useState<boolean>(false);

    // states for pagination
    const [nextPageNumber, setNextPageNumber] = React.useState<number>(1);
    const [limit, setLimit] = React.useState<number>(10);
    const [totalLoaded, setTotalLoaded] = React.useState<number>(0);
    const [totalResults, setTotalResults] = React.useState<number>(0);
    const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);

    // url
    const [baseUrl, setBaseUrl] = React.useState<string>("");
    /**
        * As loading env variable from env file is not working, and is not a good solution,
        */


    /**
     * Loading orders here
     */
    React.useEffect(() => {
        // router
        if (typeof window != 'undefined') {
            setBaseUrl(`${window.location.protocol}//${window.location.host}`);
        }
        setLoading(true);
        loadOrders();
    }, [])

    // fetch orders function
    const loadOrders = async (currentPage?: number) => {
        const order = await fetch(`${baseUrl}/api/order?page=1&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const ordersJson = await order.json();
        setTotalResults(ordersJson.totalResultsFound)
        setOrders(ordersJson.data);
        setTotalLoaded(ordersJson.data.length);
        setHasNextPage(ordersJson.hasNextPage);
        // if there is next page than set next page number
        ordersJson.hasNextPage && setNextPageNumber(ordersJson.currentPage + 1)
        setLoading(false);
    }

    const loadMoreOrders = async () => {
        setBottomLoading(true);
        const order = await fetch(`${baseUrl}/api/order?page=${nextPageNumber}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const ordersJson = await order.json();
        setOrders([...orders, ...ordersJson.data]);
        setTotalLoaded(loaded => loaded + ordersJson.data.length);
        setHasNextPage(ordersJson.hasNextPage);
        // if there is next page than set next page number
        ordersJson.hasNextPage && setNextPageNumber(ordersJson.currentPage + 1)
        setLoading(false);
        setBottomLoading(false);
    }


    return (
        <Container >

            <div className="w-[80%] m-auto">
                <Table  >
                    <TableCaption>List of recent order.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Captain Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            {/* <TableHead className="text-right">Assign Captain</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {

                            loading && <TableRow><TableCell colSpan={6} className="text-center" >
                                {/* Loading spinner */}
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                                3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>


                                Loading...
                            </TableCell></TableRow>
                        }
                        {
                            orders?.map((order: any) => (
                                <TableRow key={order.id} >
                                    <TableCell className="font-medium"><Link className="underline" href={`/order/${order.id}`}>#{order.id}</Link></TableCell>
                                    <TableCell>{order.customer.name}</TableCell>
                                    <TableCell><Button variant={'link'} ><Link href={`/captain/${order.captain?.id}`}>{order.captain?.name || "-"}</Link></Button></TableCell>
                                    {/* round to two decime if not add .00 */}
                                    <TableCell >SAR {
                                        order.item.price.toFixed(2).toString().includes(".") ?
                                            order.item.price.toFixed(2) :
                                            order.item.price.toFixed(2) + ".00"
                                    }</TableCell>
                                    <TableCell >
                                        <IsDelivered delivered={order.delivered} delivered_at={order.delivered_at} />
                                    </TableCell>
                                    <TableCell >{!order.captain &&
                                        <AssignCaptain baseUrl={baseUrl} orderId={order.id}
                                            reload={loadOrders}
                                        />
                                    }
                                        {!order.delivered && order.captain &&
                                            <MarkAsDelivered baseUrl={baseUrl} orderId={order?.id} reload={loadOrders}
                                                loading={loading} setLoading={setLoading}
                                            />
                                        }
                                    </TableCell>
                                    {/* view detail icon */}
                                    <TableCell className="text-right flex flex-col justify-center items-center text-[12px] cursor-pointer hover:text-yellow-500" ><Link href={`/order/${order.id}`}><AiOutlineEye size={18} />View</Link></TableCell>
                                </TableRow>)

                            )}
                        {/* these shpuld be in same row, load more button if there are any on left and total result loaded out of load taht will be always disaplayed  on right side */}
                        <TableRow>
                            <TableCell colSpan={3} className="text-left">
                                {hasNextPage && <Button variant="secondary" className=" bg-yellow-500 hover:bg-yellow-300 text-black " onClick={loadMoreOrders}>
                                    {
                                        bottomLoading ? (<>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                                        3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg> Loading</>) : "Load more"
                                    }
                                </Button>}
                            </TableCell>
                            <TableCell colSpan={4} className="text-right">
                                <span className="mr-2">{totalLoaded} of {totalResults} results loaded</span>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        </Container>
    )
}

export default Orders
