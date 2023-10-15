import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * This endpoint is for assigning orders to a captain.
 * endpoint usage:/api/order/assign/
 */
export async function PUT(request: NextRequest) {
  // establish connection to prisma db
  const prisma = new PrismaClient();
  try{  
    const data  = await request.json();
    const order_ids = data.ordersId;
    const captain_id = data.captainId;
    /**
     * Mapping through order_ids array and updating captain_id for each order
     */

    const queryResult = await Promise.all(
      order_ids.map(async (order_id: number) => {
        const order = await prisma.order.findUnique({
          where: {
            id: Number(order_id),
          },
        });
        if (order?.captain_id) {
          return new Response(
            JSON.stringify({
              message: "Captain is already assigned!",
              captain_assigned_id: order.captain_id,
            }),
            {
              status: 400,
            }
          );
        }
        // assigning captain to the order
        const queryResult = await prisma.order.update({
          where: {
            id: Number(order_id),
          },
          data: {
            captain_id: Number(captain_id),
          },
        });

        // Updating captain statistic to increase order_accepted by 1
        const ordersAccepted = await prisma.captainStatistic.updateMany({
          where: {
            captain_id: Number(captain_id),
          },
          data: {
            total_orders_accepted: {
              increment: 1,
            },
          },
        });
        return queryResult;
      })
    );


    return new Response(
      JSON.stringify({
        message: "Captain is assigned successfully",
        data: queryResult,
        success: true,
      })
    );
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
