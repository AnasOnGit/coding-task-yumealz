import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

/*
    This endpoint is for adding dummy data to the database.
    It is not required for the application to function.
    We can add a separate endpoint for this in the future.
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

  try {
    const res = await prisma.order.createMany({
      data: data,
    });
    return new Response(JSON.stringify({ response:res,success: true }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err }));
  } finally {
    await prisma.$disconnect();
  }
}
