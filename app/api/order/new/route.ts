import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * This endpoint is for placing a new order note assigning a captain is not required
 * as we have a septate endpoint for it. But a captain can be assign over here.
 */
export async function POST(request: NextRequest) {
  // establish connection to prisma db
  const prisma = new PrismaClient();

  // getting data from request body and parsing it
  const body = await request.json();
  /* 
  inserting data from the body into the database
  */
  const data = body.data;

  /**
   * check if all required fields are present
   * - customer_id
   * - customer_longitude
   * - customer_latitude
   */

  if (
    !data.customer_id ||
    !data.customer_longitude ||
    !data.customer_latitude
  ) {
    return new Response(
      JSON.stringify({ message: "Required fields are missing" }),
      {
        status: 400,
      }
    );
  }
  try {
    const response = await prisma.order.create({
      data: data,
    });
    return new Response(
      JSON.stringify({
        message: "Order is placed successfully",
        data: response,
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
