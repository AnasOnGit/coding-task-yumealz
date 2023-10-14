'use client'
import React, { ReactElement } from "react"
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
import { Button } from './ui/button';
import { FiSave } from 'react-icons/fi';

// tooltip
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {

    baseUrl: string,
    orderId: number,
    reload: () => Promise<void>,
}

function AssignCaptain({
    baseUrl,
    orderId,
    reload,


}: Props): ReactElement {
    // states
    const [captain, setCaptain] = React.useState<any>([]);
    const [selectedAssignedCaptain, setSelectedAssignedCaptain] = React.useState<string>("");
    const [assignLoading, setAssignLoading] = React.useState<boolean>(false);
    const [assignCaptainDialogOpen, setAssignCaptainDialogOpen] = React.useState<boolean>(false);

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
            // this function is reponsible for reloading orders
            await reload();
        }
        return;
    }
    return (

        <Dialog open={assignCaptainDialogOpen} onOpenChange={setAssignCaptainDialogOpen}>
            <Button variant="secondary" className=" bg-yellow-500 hover:bg-yellow-300 text-black "
                onClick={() => {
                    setAssignCaptainDialogOpen(true)
                    captain.length === 0 && loadCaptainName();
                }}
            >Assign Captain</Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign a Captain to Order#{orderId}</DialogTitle>
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
                                    await assignCaptainToOrder(orderId, selectedAssignedCaptain)
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

    )
}

const MarkAsDelivered = ({ loading, setLoading, baseUrl, reload, orderId }: {
    loading: boolean,
    setLoading: (loading: boolean) => void,
    baseUrl: string,
    orderId: number,
    reload: () => Promise<void>,
}) => {
    // states
    const [disableOtherActions, setDisableOtherActions] = React.useState<boolean>(false);
    // method to mark order as delivered
    const markAsDelivered = async (id: number) => {
        setLoading(true);
        setDisableOtherActions(true)

        const order = await fetch(`${baseUrl}/api/order/${orderId}/deliver`, {
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
            await reload();
        }
        setDisableOtherActions(false);

    }
    return (

        <Button variant="link" disabled={disableOtherActions} onClick={() => {
            markAsDelivered(orderId);
        }}>
            {/* if disabled show loading of slight green color */}
            {
                disableOtherActions && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
                        5.291A7.962 7.962 0 014 12H0c0 3.042 1.135
                        5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )
            }

            Mark as delivered</Button>
    )
}

const IsDelivered = ({ delivered, delivered_at }: {
    delivered: boolean,
    delivered_at: string,
    
}) => {
    // className={`${!order.delivered ? 'text-yellow-500' : "text-green-500"}`}
    return (
        <>
            {delivered ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="text-green-500">Delivered</TooltipTrigger>
                        <TooltipContent>
                            <p>{new Date(delivered_at).toUTCString()}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            ) : <p className="text-yellow-500">Not delivered</p>}
        </>
    )
}

export { AssignCaptain, MarkAsDelivered, IsDelivered }
