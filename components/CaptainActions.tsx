import { AiFillStar } from "react-icons/ai"
// table 
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"
// toast
import { useToast } from "@/components/ui/use-toast"
// link
import Link from "next/link"
// dialog component
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Skeleton from "react-loading-skeleton";
// import {Skeleton} from "@/components/ui/skeleton";

import { Button } from "./ui/button";
import { Loading } from "./Loading";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip";
import { FiSave } from "react-icons/fi";
import React from "react";

// checkbox
import { Checkbox } from "@/components/ui/checkbox"


// Captain table - Because we need if more than once
export const CaptainTable = ({ captain, rating,
    name,
    rejected,
    accepted,
    delivered,
    canceled,
    distanceTraveled,
    vehicleType,
    vehicleModel,
    vehicleColor,
    vehiclePlate,
}: {
    captain: any,
    rating: number,
    name: string,
    rejected: number,
    accepted: number,
    delivered: number,
    canceled: number,
    distanceTraveled: number,
    vehicleType: string,
    vehicleModel: string,
    vehicleColor: string,
    vehiclePlate: string
}) => {
    // add loading if captain is empty
    if (captain.length === 0) {
        return (
            <Table className={`mt-2 mb-10 border`}>
                <TableBody>
                    <TableRow className="border">
                        <TableHead>Captain ID</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow className="border">
                        <TableHead>Rating</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Rejected Orders</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Accepted Orders</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Delivered Orders</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Canceled Orders</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Distance Traveled</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Vehicle Type</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Vehicle Model</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Vehicle Plate</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Vehicle Color</TableHead>
                        <TableCell><Skeleton width={90}/></TableCell>
                    </TableRow>


                </TableBody>
            </Table>
        )
    }



    return (
        <Table className={`mt-2 mb-10 border`}>
            <TableBody>
                <TableRow className="border">
                    <TableHead>Captain ID</TableHead>
                    <TableCell>#{captain?.id}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableCell>{name}</TableCell>
                </TableRow>
                <TableRow className="border">
                    <TableHead>Rating</TableHead>
                    <TableCell>
                        <CaptainRating rating={rating} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Rejected Orders</TableHead>
                    <TableCell>{rejected}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Accepted Orders</TableHead>
                    <TableCell>{accepted}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Delivered Orders</TableHead>
                    <TableCell>{delivered} <Link className="text-blue-600 hover:text-blue-400 hover:underline" href={`/captain/${captain.id}/delivered`}>(View All Orders)</Link></TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Canceled Orders</TableHead>
                    <TableCell>{canceled}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Distance Traveled</TableHead>
                    <TableCell>{distanceTraveled} km</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Vehicle Type</TableHead>
                    <TableCell>{vehicleType}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Vehicle Model</TableHead>
                    <TableCell>{vehicleModel}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Vehicle Plate</TableHead>
                    <TableCell>{vehiclePlate}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Vehicle Color</TableHead>
                    <TableCell>{vehicleColor}</TableCell>
                </TableRow>


            </TableBody>
        </Table>
    )
}

// Component for showing rating
export const CaptainRating = ({
    rating
}: any) => {
    return (
        <p
            className={`${rating >= 3.5 ? 'text-green-500' : rating < 2 ? "text-red-500" : "text-yellow-500"} flex flex-row gap-1 items-center`}>
            <AiFillStar /> {rating}
        </p>
    )
}


export const AssignOrders = ({ captainId, baseUrl }: {
    captainId: Number,
    baseUrl: string
}) => {
    // states
    const [dialogTriggerOpen, setDialogTriggerOpen] = React.useState<boolean>(false);
    const [loadingOrders, setLoadingOrders] = React.useState<boolean>(false);
    const [orderLoaded, setOrderLoaded] = React.useState<any>([]);
    const [selectedOrders, setSelectedOrders] = React.useState<any>([]);
    const [assigningOrder,setAssigningOrder] = React.useState<boolean>(false);
    // toast
    const { toast } = useToast();

// functions
    const loadUnAssignedOrders = async () => {
if(selectedOrders.length === 0){
    const where = JSON.stringify({
        captain_id: null
   
});
console.log(where)
    setLoadingOrders(true)
    const orders = await fetch(`${baseUrl}/api/order?limit=20&where=${where}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const ordersJson = await orders.json();
    
    setOrderLoaded(ordersJson.data)
    setLoadingOrders(false)
}
}

    
// login to add orders to list
    const handleCheckbox = (checked: boolean, value: number) => {
        if (checked) {
            setSelectedOrders([...selectedOrders, value]);
        } else {
            setSelectedOrders(selectedOrders.filter((order: any) => order != value));
        }
    }

// assign orders
const assignOrders = async() => {
    setAssigningOrder(true)
    // base/api/order/assign 
    const assignReq = await fetch(baseUrl + "/api/order/assign",{
        method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    captainId,
                    ordersId: selectedOrders,
                }
            )
    });

    if(assignReq?.status === 200){
        toast({
            title: "Notification",
            description: `${selectedOrders.length} ${selectedOrders.length>1?"orders":"order"} have been assigned to the Captain.`,
          });
          setSelectedOrders([]);
          setDialogTriggerOpen(false);
          setAssigningOrder(false)
        }else{
            toast({
                title: "Notification",
                description: `An error occured!`,
            });
            setAssigningOrder(false);
    }

}
    return (
        <Dialog
            open={dialogTriggerOpen}
            onOpenChange={setDialogTriggerOpen}
        >
            {/* <DialogTrigger> */}
            <Button variant="ghost" onClick={() => {
                setDialogTriggerOpen(!dialogTriggerOpen)
                loadUnAssignedOrders()
            }}>Assign Orders</Button>
            {/* </DialogTrigger> */}
            <DialogContent className={"lg:max-w-screen-lg  max-h-screen"}>
                <DialogHeader>

                    Assign Orders  to Captain #{captainId.toString()}
                </DialogHeader>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <p>Order Selected: {selectedOrders.length}</p>
                {selectedOrders.length > 0 && <> 
                {
                assigningOrder ? <Button variant={"link"} disabled={true}>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
                        5.291A7.962 7.962 0 014 12H0c0 3.042 1.135
                        5.824 3 7.938l3-2.647z"></path>
                    </svg>
                Assigning Orders
                </Button>
                :
                <Button variant={"link"} onClick={assignOrders}>Assign Order</Button>
                }
                </>}
                    </div>
                    
                            <div className="h-[200px] overflow-y-scroll">
                                
                                <Table >
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loadingOrders && <TableRow>
                                            <TableCell className="text-center" colSpan={4}>
                                                <Loading />
                                            </TableCell>
                                            </TableRow>}
                                        {orderLoaded.map((order: any) => (
                                            <TableRow key={order.id}>
                                                <TableCell>{order.id}</TableCell>
                                                <TableCell>{order.customer.name}</TableCell>
                                                <TableCell>SAR {order.item.price}</TableCell>
                                                <TableCell>
                                                    <Checkbox
                                                    checked={selectedOrders.includes(order.id)}
                                                        onCheckedChange={(checked:boolean)=>handleCheckbox(checked,order.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                    



                </div>

            </DialogContent>
        </Dialog>
    )
}