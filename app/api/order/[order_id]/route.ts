import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * This endpoint is for getting a single order from database .
 * endpoint usage:/api/order/[order_id]
 */
export async function GET(request : NextRequest,{ params }: { params: { order_id: string } }) {
  // establish connection to prisma db
  const prisma = new PrismaClient();

  try {
    // getting total number of rows in the table
    const totalResultsFound = await prisma.order.count();
    /**
     * getting data from database where id matches and also including captain data
     */
    const queryResult = await prisma.order.findUnique(
        {
            where: {
            id: Number(params.order_id),
            },
            include: {
                captain: true,
                item: true,
                customer: true,
            
            },
        }
        
        
    );

//    if no data is found then return 404
    if (!queryResult) {
      return new Response(JSON.stringify({ message: "No data found" }), {
        status: 404,
      });
    }
    // return data
    return new Response(JSON.stringify({ 
      message:"Order is fetched successfully",
        data:queryResult, success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
