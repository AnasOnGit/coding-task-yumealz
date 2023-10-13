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
// dialoag component
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// select component
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// tooltip
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from 'next/router';

// icons
import { FiSave } from "react-icons/fi"
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


    // method to mark order as delivered
    const markAsDelivered = async (id: number) => {
        setLoading(true);
        setDisableOtherActions(true)

        const order = await fetch(`${baseUrl}/api/order/${id}/deliver`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                delivered: true
            })
        });

        //    if success is true than reload orders
        if (order.status === 200) {
            // setOrders([])
            await loadOrders();
        }
        setDisableOtherActions(false);

    }
    // load captain
    const loadCaptainName = async () => {
        const captain = await fetch(`${baseUrl}/api/captain?no_limit=true&sort_by=asc&order_by=name`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const captainJson = await captain.json();
        setCaptain(captainJson);
    }

    // assignCaptainToOrder
    const assignCaptainToOrder = async (orderId: number, captainId: string,) => {
        const assignCaptain = await fetch(`${baseUrl}/api/order/${orderId}/assign/${captainId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const assignCaptainJson = await assignCaptain.json();
        // TODO:: If data is saved successfully reload orders
        if (assignCaptainJson.success) {
            await loadOrders();
        }
        return;
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
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">#{order.id}</TableCell>
                                    <TableCell>{order.customer.name}</TableCell>
                                    <TableCell><Button variant={'link'} ><Link href={`/captain/${order.captain?.id}`}>{order.captain?.name || "-"}</Link></Button></TableCell>
                                    <TableCell >SAR {order.price}</TableCell>
                                    <TableCell className={`${!order.delivered ? 'text-yellow-500' : "text-green-500"}`} >{order.delivered ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>Delivered</TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{new Date(order.delivered_at).toUTCString()}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    ) : "Not delivered"}</TableCell>
                                    {!order.captain && <TableCell >
                                        <Dialog open={assignCaptainDialogOpen} onOpenChange={setAssignCaptainDialogOpen}>
                                            <Button variant="secondary" className=" bg-yellow-500 hover:bg-yellow-300 text-black "
                                                onClick={() => {
                                                    setAssignCaptainDialogOpen(true)
                                                    captain.length === 0 && loadCaptainName();
                                                }}
                                            >Assign Captain</Button>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Assign a Captain to Order#{order.id}</DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className="flex items-center justify-center mt-5">
                                                    {/* select menu to display captain menu */}
                                                    <Select onValueChange={
                                                        (value) => {
                                                            setSelectedAssignedCaptain(value.toString());
                                                        }
                                                    }>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select Captain" />
                                                        </SelectTrigger>
                                                        <SelectContent className="overflow-y-auto max-h-[10rem]">
                                                            {
                                                                captain.length === 0 && <SelectItem value="Loading..." disabled={true}>Loading...</SelectItem>
                                                            }
                                                            {
                                                                captain?.data?.map((captain: any) => (
                                                                    <SelectItem key={captain.id} value={captain?.id?.toString()}>{captain?.name} </SelectItem>
                                                                ))
                                                            }


                                                        </SelectContent>
                                                    </Select>

                                                </DialogDescription>
                                                <DialogFooter>


                                                    <Button disabled={selectedAssignedCaptain === "" ? true : false}
                                                        className="text-white"
                                                        onClick={
                                                            async () => {
                                                                if (selectedAssignedCaptain === "") {

                                                                } else {
                                                                    setAssignLoading(true)
                                                                    await assignCaptainToOrder(order.id, selectedAssignedCaptain)
                                                                    setAssignCaptainDialogOpen(false)
                                                                    setSelectedAssignedCaptain("")
                                                                    setAssignLoading(false)
                                                                }
                                                            }
                                                        }
                                                    >
                                                        {assignLoading ?
                                                            (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                                                            3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            )
                                                            :
                                                            <FiSave size={15} className="mr-1" />

                                                        }
                                                        {assignLoading ? "Saving" : "Save"}</Button>

                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>}
                                    {!order.delivered && order.captain && <TableCell >

                                        <Button variant="link" disabled={disableOtherActions} onClick={() => {
                                            markAsDelivered(order.id);
                                        }}>Mark as delivered</Button></TableCell>}
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
                            <TableCell colSpan={3} className="text-right">
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
