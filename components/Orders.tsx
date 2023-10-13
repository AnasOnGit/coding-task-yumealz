
import React, { ReactElement } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Container from './ui/Container'
import { Button } from "@/components/ui/button"
import axios from 'axios'





interface Props {
    
}





async function Orders({}: Props) {
  // fetch orders function
const loadOrders = async() => {
  const order = await fetch('/api/order',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return order;
}
  const ordersList = await loadOrders();
console.log(ordersList)
    return (
        <Container >
            <Table >
      <TableCaption>A list of recent order.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Captain</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Delivered</TableHead>
          {/* <TableHead className="text-right">Assign Captain</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {ordersList.map((order: {
          order:any
        }) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell >{invoice.totalAmount}</TableCell>
            <TableCell >{invoice.paymentStatus}</TableCell>
            {invoice.paymentMethod === 'PayPal' && <TableCell ><Button variant="ghost" color="green">Assign Captain</Button></TableCell>}
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
    </Container>
    )
}

export default Orders
