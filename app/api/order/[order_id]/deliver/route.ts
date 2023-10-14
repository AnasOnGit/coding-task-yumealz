import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
/**
 * NOTE: These api routes are not protected by any authentication, as anyone
 * can access these routes.For this task I am not implementing any authentication.
 */

/**
 * This endpoint is for mark an order as delivered.
 * endpoint usage:/api/order/[order_id]/deliver
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { order_id: string } }
) {
  // establish connection to prisma db
  const prisma = new PrismaClient();

  try {
    /**
     * Check if captain is assign to the order or not
     * Check if order is already delivered or not
     */
    const order = await prisma.order.findUnique({
      where: {
        id: Number(params.order_id),
      },
    });
    // if order not found then return 404
    if (!order) {
      return new Response(JSON.stringify({ message: "No order found!" }), {
        status: 404,
      });
    }
    if (!order?.captain_id) {
      return new Response(
        JSON.stringify({
          message: "Captain is not assigned to the order",
        }),
        {
          status: 400,
        }
      );
    }
    if (order?.delivered) {
      return new Response(
        JSON.stringify({
          message: "Order is already delivered",
        }),
        {
          status: 400,
        }
      );
    }
    /**
     * updating the order with delivered_at field
     */

    const queryResult = await prisma.order.update({
      where: {
        id: Number(params.order_id),
      },
      data: {
        delivered:true,
        delivered_at: new Date(),
      },
    });
    /**
     * TODO:: Add transaction to update captain statistic like total distance travelled
     * and more.
     */
    // adding one to captain's total delivered orders
    await prisma.captainStatistic.updateMany({
      where: {
        captain_id: Number(order.captain_id),
      },
      data: {
        total_orders_delivered: {
          increment: 1,
        },
      
      },
    });
    return new Response(
      JSON.stringify({
        message: "Order is delivered successfully",
        data: queryResult,
        success: true,
      })
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
