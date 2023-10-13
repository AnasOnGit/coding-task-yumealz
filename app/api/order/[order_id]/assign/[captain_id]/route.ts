import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * This endpoint is for assigning a captain to a order.
 * endpoint usage:/api/order/[order_id]/assign/[captain_id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { order_id: string; captain_id: string } }
) {
  // establish connection to prisma db
  const prisma = new PrismaClient();

  try {
    // checking if captain is already assigned to the order
    const order = await prisma.order.findUnique({
      where: {
        id: Number(params.order_id),
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
        id: Number(params.order_id),
      },
      data: {
        captain_id: Number(params.captain_id),
      },
    });
    return new Response(
      JSON.stringify({
        message: "Captain is assigned successfully",
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
