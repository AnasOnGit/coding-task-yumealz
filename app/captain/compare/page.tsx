'use client'
import React, { ReactElement, use } from 'react'
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Container from '@/components/ui/Container'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/Loading'
import { Captain, CaptainStatistic } from '@/types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// chart
import BarCart from "@/components/BarChart"

// label
import { Label } from "@/components/ui/label"


interface Props {

}

function ComparePerformance({ }: Props): ReactElement {
    // states
    const searchParams = useSearchParams()
    // const captainOneId = searchParams.get('captain_one_id')
    // const captainTwoId = searchParams.get('captain_two_id')

    const [captainOneId, setCaptainOneId] = React.useState<string>(searchParams.get('captain_one_id') || "")
    const [captainTwoId, setCaptainTwoId] = React.useState<string>(searchParams.get('captain_two_id') || "")

    // selected captains data
    const [captainOneData, setCaptainOneData] = React.useState<Captain | null>(null);
    const [captainTwoData, setCaptainTwoData] = React.useState<Captain | null>(null);

    const [baseURL, setBaseURL] = React.useState<string | null>(null)
    const [captains, setCaptains] = React.useState<Captain[] | []>([])
    const [loading, setLoading] = React.useState<boolean>(true);
    // state for managing chart
    const [compareData, setCompareData] = React.useState<boolean>(false)
    // label for chart
    const [chatLabel, setChartLabel] = React.useState<string>("Total Orders Delivered");
    const [comparingMetricData, setComparingMetricData] = React.useState<string>("total_orders_delivered");
    const [metrics, setMetrics] = React.useState<
        {
            label: string;
            value: string;
        }[]
    >([
        {
            label: "Total Orders Delivered",
            value: "total_orders_delivered"
        },
        {
            label: "Total Orders Accepted",
            value: "total_orders_accepted"
        },
        {
            label: "Total Orders Rejected",
            value: "total_orders_rejected"
        },
        {
            label: "Total Orders Cancelled",
            value: "total_orders_canceled"
        },
        {
            label: "Total Rating",
            value: "total_rating"
        },
    ]);
    // setting chart component, It will be used to render chart component
    const [selectedChartType,setSelectedChartType] = React.useState<string>("bar")
    const [chartTypes,setChartTypes] = React.useState<{
        label: string;
        value: string;
    }[]>([{
        label:"Bar",
        value:"bar",

    },
    {
        label:"Line",
        value:"line",

    },
    {
        label:"Pie",
        value:"pie",
    },
    {
        label:"Doughnut",
        value:"doughnut"
    },
 

])

    // useEffects
    React.useEffect(() => {
        if (typeof window != 'undefined') {
            setBaseURL(window.location.origin);
            loadCaptainsNames()
        }
    }, [])
    // load captains names
    const loadCaptainsNames = async () => {
        setLoading(true)
        const captainsData = await fetch(`/api/captain?no_limit=true`)
        const captainsDataJson = await captainsData.json()
        setCaptains(captainsDataJson.data)
        setLoading(false)
    }

    return (
        <Container>
            <Card className="md:w-[60%] lg:w-[40%] w-[90%] m-auto mt-5">
                <CardHeader>
                    <CardTitle className="flex flex-row justify-between">
                        Compare Captain Performance
                        {
                            // green loading circle
                            loading && (
                                <div className="flex flex-row text-md items-center text-green-500">

                                <svg className="animate-spin h-5 w-5 mr-1 ..." viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                                Loading
                                </div>

                                

                            )
                        }


                    </CardTitle>
                    <CardDescription>Select Captains</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row gap-2">

                    <SelectComponent
                        captains={captains}
                        selectedCaptain={captainOneId}
                        setSelectedCaptain={setCaptainOneId}
                        placeholder="Select First Captain"
                        oppositeCaptainId={captainTwoId}
                        setCaptainData={setCaptainOneData}
                        captainData={captainOneData}
                        urlQuery="captain_one_id"
                    />
                    <SelectComponent
                        captains={captains}
                        selectedCaptain={captainTwoId}
                        setSelectedCaptain={setCaptainTwoId}
                        placeholder="Select Second Captain"
                        oppositeCaptainId={captainOneId}
                        setCaptainData={setCaptainTwoData}
                        captainData={captainTwoData}
                        urlQuery="captain_two_id"
                    />

                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        onClick={() => {

                            setCompareData(true)
                        }
                        }
                        className="relative"
                        disabled={loading || captainOneId === "" || captainTwoId === "" ? true : false}>
                            {!compareData && captainOneId !== "" && captainTwoId !== "" && <div className="w-4 h-4 bg-yellow-500 absolute -top-2 animate-pulse  -left-1 rounded-full"></div>}
                        Compare
                    </Button>
                </CardFooter>
            </Card>
            {
                compareData && (
                    <>
                        
                        <section className="my-8 md:w-[60%] w-[90%] m-auto">
                        {/* chart options */}
                           <div className="flex flex-row gap-5 justify-center items-center my-5">
                            {/* select chart */}
                            <div className="flex flex-col gap-2">
                            <Label htmlFor="chartType">Chart Type:</Label>
                           <Select
                          
                          defaultValue={selectedChartType}
                                onValueChange={
                                    (value) => {
                                        setSelectedChartType(value)
                                        
                                    }
                                } >
                                <SelectTrigger  id="chartType">
                                    <SelectValue placeholder="Chart Type" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="overflow-y-auto max-h-[10rem]">
                                    {
                                        chartTypes.map((chart:{
                                            label: string;
                                            value: string;
                                        
                                        }) => (
                                            <SelectItem
                                                value={chart.value}
                                                key={chart.value}

                                            >
                                                {chart?.label}
                                            </SelectItem>
                                        ))


                                    }
                                </SelectContent>
                            </Select>
                            </div>
                                    {/* metric options */}
                            <div className="flex flex-col gap-2">
                            <Label htmlFor="metric_type">Metric type:</Label>
                            <Select
                                defaultValue={comparingMetricData}
                                onValueChange={
                                    (value) => {
                                        setComparingMetricData(value)
                                        // get label of the selected metric using value and chartLabel
                                        setChartLabel(metrics.find((metric) => metric.value === value)?.label || "Total Orders Delivered");
                                    }
                                } >
                                <SelectTrigger>
                                    <SelectValue id="metric_type" placeholder="Set Metric" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="overflow-y-auto max-h-[10rem]">
                                    {
                                        metrics.map((metric:{
                                            label: string;
                                            value: string;
                                        
                                        }) => (
                                            <SelectItem
                                                value={metric.value}
                                                key={metric.value}

                                            >
                                                {metric?.label}
                                            </SelectItem>
                                        ))


                                    }
                                </SelectContent>
                            </Select></div>
                           </div>

                            <BarCart
                            chartType={selectedChartType}
                                labels={
                                    [
                                        `${captainOneData?.name}`,
                                        `${captainTwoData?.name}`,
                                    ]
                                }
                                label={chatLabel}
                                data={
                                    [
                                        Number(captainOneData?.captain_statistic[0]?.[comparingMetricData as keyof CaptainStatistic]),
                                        Number(captainTwoData?.captain_statistic[0]?.[comparingMetricData as keyof CaptainStatistic]),
                                    ]
                                }
                            />
                        </section>
                    </>
                )
            }

        </Container>
    )
}


const SelectComponent = ({ captains,
    selectedCaptain,
    setSelectedCaptain,
    placeholder,
    oppositeCaptainId,
    setCaptainData,
    captainData,
    urlQuery,
}: {
    captains: Captain[],
    selectedCaptain: string,
    setSelectedCaptain: any,
    placeholder: string,
    oppositeCaptainId: string,
    setCaptainData: any,
    captainData: Captain | null,
    urlQuery: string,

}) => {

    /**
     * When the component is mounted, The captain data is
     * is null by default as captains array is empty. To fix this I am using
     * UseEffect to set captain data when the component is mounted and captains
     * is not empty
     */
    React.useEffect(() => {

        setCaptainData(captains.find((captain: Captain) => captain.id.toString() === selectedCaptain))
    }, [captains, selectedCaptain])
    return (
        <>
            {
                captains.length === 0 ? <SelectComponentSkeleton placeholder={placeholder} /> :
                    <Select
                        defaultValue={selectedCaptain}
                        onValueChange={
                            (value) => {
                                /**
                                 * When value changes, I am also adding/updating the url
                                 */
                                const url = new URL(window.location.href)
                                url.searchParams.set(urlQuery, value)
                                window.history.pushState({}, '', url.toString())

                                setSelectedCaptain(value);
                                setCaptainData(captains.find((captain: Captain) => captain.id.toString() === value))
                            }
                        } >
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent position="popper" className="overflow-y-auto max-h-[10rem]">
                            {
                                captains.length > 0 ? captains.map((captain: Captain) => (
                                    <SelectItem
                                        disabled={oppositeCaptainId === captain?.id.toString() ? true : false}
                                        value={captain?.id.toString()}
                                        key={captain?.id}
                                        onClick={() => {

                                            setSelectedCaptain(captain?.id.toString())
                                            setCaptainData(captain)
                                        }}
                                    >
                                        {captain?.name}
                                    </SelectItem>
                                )) : (
                                    <SelectItem disabled={true} value="0">
                                        <Loading />
                                    </SelectItem>
                                )


                            }

                        </SelectContent>
                    </Select>
            }
        </>
    )
}

const SelectComponentSkeleton = ({ placeholder }: {
    placeholder: string
}) => {

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper" className="overflow-y-auto max-h-[10rem]">
                <SelectItem disabled={true} value="0">
                    Loading
                </SelectItem>
                <SelectItem disabled={true} value="0">
                    <Skeleton />
                </SelectItem>
                <SelectItem disabled={true} value="0">
                    <Skeleton />
                </SelectItem>
            </SelectContent>
        </Select>
    )


}
export default ComparePerformance
