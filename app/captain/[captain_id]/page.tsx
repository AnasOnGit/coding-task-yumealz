'use client'
import Container from '@/components/ui/Container'
import React, { ReactElement } from 'react'
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
import { Button } from "@/components/ui/button";
// skeleton
import Skeleton from 'react-loading-skeleton'

import { AssignOrders, CaptainTable } from "@/components/CaptainActions"
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
interface Props {
    params: {
        captain_id: string
    }
}


function CaptainInfo({ params }: Props): ReactElement {
    // states
    const [loading, setLoading] = React.useState<boolean>(true);
    const [captain, setCaptain] = React.useState<any>([]);
    const [baseUrl, setBaseUrl] = React.useState<string>("");
    // useEffect
    React.useEffect(() => {
        if (typeof window != 'undefined') {
            setBaseUrl(`${window.location.protocol}//${window.location.host}`);
            loadCaptainInfo();
        }
    }, [])

    // load captain info
    const loadCaptainInfo = async () => {
        const data = await fetch(`${baseUrl}/api/captain/${params.captain_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
           
        });
        const captainJson = await data.json();
        setCaptain(captainJson.data);
        console.log(captainJson.data)
        setLoading(false);
    }

    return (
        <Container >
            <Link href="/captain" className="flex flex-row text-center  items-center text-[22px] hover:text-blue-500 hover:underline mb-3" ><IoIosArrowBack size={22} />Captain#{params.captain_id}</Link>
            <section className="flex flex-col  items-end sm:wd-[90%] md:w-[50%] m-auto">
                <div className="flex flex-row w-full justify-between items-center">
                    <p>Captain Info</p>
                    {/* <Button variant="ghost">Assign Orders</Button> */}
                   {captain?.captain_statistic  && <AssignOrders
                        baseUrl={baseUrl}
                        captainId={Number(params.captain_id)}
                    />}
                </div>

                {
                   <CaptainTable
                        captain={captain}
                        name={captain.name}
                        rating={captain?.captain_statistic && captain?.captain_statistic[0]?.total_rating}
                        rejected={captain?.captain_statistic && captain?.captain_statistic[0]?.total_orders_rejected}
                        accepted={captain?.captain_statistic && captain?.captain_statistic[0]?.total_orders_accepted}
                        delivered={captain?.captain_statistic && captain?.captain_statistic[0]?.total_orders_delivered}
                        canceled={captain?.captain_statistic && captain?.captain_statistic[0]?.total_orders_canceled}
                        distanceTraveled={captain?.captain_statistic && captain?.captain_statistic[0]?.total_distance_traveled}
                        vehicleType={captain?.captain_attributes && captain?.captain_attributes[0]?.vehicle_type}
                        vehicleModel={captain?.captain_attributes && captain?.captain_attributes[0]?.vehicle_model}
                        vehicleColor={captain?.captain_attributes && captain?.captain_attributes[0]?.vehicle_color}
                        vehiclePlate={captain?.captain_attributes && captain?.captain_attributes[0]?.vehicle_plate_number}
                    />
                }

            </section>

        </Container>
    )
}

export default CaptainInfo
