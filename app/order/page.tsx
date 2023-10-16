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
import { OrdersTable } from '@/components/OrderActions';


interface Props {

}



function Orders({ }: Props) {
   


    return (
        <Container >

            <div className="w-[80%] m-auto">
                <OrdersTable
                />
            </div>
        </Container>
    )
}

export default Orders
