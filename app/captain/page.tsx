'use client';
import Container from '@/components/ui/Container'
import React, { ReactElement } from 'react'
import Link from 'next/link';

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
// skeleton
import Skeleton from 'react-loading-skeleton'
// 
import { CaptainRating } from "@/components/CaptainActions"
// icons
import {AiOutlineEye} from "react-icons/ai"
import { Captain } from '@/types';
// types
interface Props {
    
}


function CaptainsPage({}: Props): ReactElement {

    const [baseUrl, setBaseUrl] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);
    const [captains, setCaptains] = React.useState<Captain[]>([]);

    // useEffect
    React.useEffect(() => {
        if (typeof window != 'undefined') {
            setBaseUrl(`${window.location.protocol}//${window.location.host}`);
            loadCaptainsInfo();
        }
    }, [])
    const loadCaptainsInfo = async() => {
        const data = await fetch(`${baseUrl}/api/captain?no_limit=true&sort_by=asc&order_by=name`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const captainsJson = await data.json();
        setCaptains(captainsJson.data);
        setLoading(false);

    }
    return (
        <Container>
            <section className="w-[90%] md:w-[70%] m-auto">
            <Table>
                <TableHeader>
                    
                    <TableRow>
                        <TableHead className="w-[100px]">Captain ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Total Deliveries</TableHead>
                        <TableHead>Ratings</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                      {/* show loading when not loaded */}
               { loading && <TableRow><TableCell colSpan={6} className="text-center" >
                                {/* Loading spinner */}
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                                3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>


                                Loading...
                            </TableCell></TableRow>}
                    {captains.map((captain) => (
                        <TableRow key={captain.id}>
                            <TableCell className="font-medium"><Link href={`/captain/${captain.id}`} className="text-blue-500 hover:text-blue-300">#{captain.id}</Link></TableCell>
                            <TableCell>{captain?.name}</TableCell>
                            <TableCell >{captain?.captain_statistic[0]?.total_orders_delivered}</TableCell>
                            
                            <TableCell 
                            >
                               <CaptainRating rating={captain?.captain_statistic[0]?.total_rating}/> 
                            </TableCell>
                            <TableCell className={`${captain?.status ? 'text-green-500': "text-red-500"}`}>{captain?.status}</TableCell>
                            {/* view detail icon */}
                            <TableCell className="text-right flex flex-col justify-center items-center text-[12px] cursor-pointer hover:text-yellow-500" ><Link href={`/captain/${captain.id}`}><AiOutlineEye size={18} />View</Link></TableCell>
                        </TableRow>
                    ))}
                    {/* total result found */}
                    <TableRow>
                    <TableCell colSpan={6} className="text-right">
                                <span className="">{captains?.length} of {captains?.length} results loaded</span>
                            </TableCell>
                        </TableRow>
                </TableBody>

            </Table>
                </section>
        </Container>
    )
}

export default CaptainsPage
