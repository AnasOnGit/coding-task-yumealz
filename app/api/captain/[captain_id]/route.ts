import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * This endpoint is for getting a single captain from database .
 * endpoint usage:/api/captain/[captain_id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { captain_id: string } }
) {
  // establish connection to prisma db
  const prisma = new PrismaClient();

  try {
    // getting total number of rows in the table
    const totalResultsFound = await prisma.captain.count();
    /**
     * getting data from database where id matches and also including captain data
     */
    const queryResult = await prisma.captain.findUnique({
      where: {
        id: Number(params.captain_id),
      },
      include: {
        _count: {
          select: { orders: true },
        },
        orders: true,
        captain_attributes: true,
        captain_statistic: true,
      },
    });

    //    if no data is found then return 404
    if (!queryResult) {
      return new Response(JSON.stringify({ message: "No data found" }), {
        status: 404,
      });
    }
    // return data
    return new Response(
      JSON.stringify({
        message: "Captain is fetched successfully",
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
