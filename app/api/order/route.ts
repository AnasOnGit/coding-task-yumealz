import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
// TODO:: UPDATE: commets for order by and sort up
/**
 * This endpoint is for getting all orders from database with pagination.
 * endpoint usage:/api/order?page=1&limit=10&order_by=created_at&sort_by=desc
 */
export async function GET(request : NextRequest) {
  // establish connection to prisma db
  const prisma = new PrismaClient();
  // default values for page, order_by and limit
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;
  // default for order_by and sort_by is set to created_at and desc because we want to show latest orders first
  const DEFAULT_ORDER_BY = 'delivered';

  const DEFAULT_SORT_BY = 'asc';
 
  /**
   * Using URLSearchParams to get query params from url
   * Query may or may not have query, if not use default
   * Default values are store above.
   */
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') ?? DEFAULT_PAGE) ;
  const limit = Number(searchParams.get('limit')?? DEFAULT_LIMIT) ;
  // const orderBy = searchParams.get('order_by') ?? DEFAULT_ORDER_BY;
  const orderBy = JSON.parse(searchParams.get('order_by') || "{}");
  const sortBy = searchParams.get('sort_by') ?? DEFAULT_SORT_BY ;
  const where = JSON.parse(searchParams.get('where') || "{}") ;

 /**
  * Calculating offset for pagination, offset is used to skip
  * It is calculated by (page - 1) * limit. 
  * Explanation: offset is the number of rows to skip before starting to return rows from the query, 
  * if we are on page 1 then offset will be 0, if we are on page 2 then offset will be 10, 
  * if we are on page 3 then offset will be 20 and so on. 
  */
  const offset = (page - 1) * limit;
  try {
    // getting total number of rows in the table
    const totalResultsFound = await prisma.order.count(
      {where:where ? where : {},}
    );
    // getting data from database
    const queryResult = await prisma.order.findMany(
      {
        skip: offset,
        take: limit,
        include:{
          captain:true,
          customer:true,
          item:true,
        },
        where:where,
        /**
         * TODO::Implement query parameter to add more than one sorting options
         * now second option is hardcoded.
         * Goal is to first show order which doesn't have any captain assign
         * than show, order that are not delivered yet, than finally show
         * latest delivered orders.
         */
        orderBy: orderBy
      }
    
    );
    // calculate if there is next page or not and there is previous page or not
    /**
     * if we are on page 1 and total rows are 10 and limit is 10 then there is no next page
     */
    const hasNextPage = totalResultsFound > page * limit;
    /**
     * if we are on page 1 then there is no previous page
     */
    const hasPreviousPage = page > 1;

    // return 404 if no data is found
    if (!queryResult) {
      return new Response(JSON.stringify({ message: "No data found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ 
      message:"Orders are fetched successfully",
      hasNextPage,
      hasPreviousPage,
      totalResultsFound,
      currentPage:page,
      data:queryResult, success: true }),{
        status:200
      });
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ message: err }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}


