// import { NextResponse } from 'next/server';

import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export  async function GET(request: NextRequest) {
    const prisma = new PrismaClient();
   try{
    // get all users from test db
    const users = await prisma.test.findMany();
    console.log(users);
    return new Response(JSON.stringify({ users }));
   }
    catch(err){
     console.log(err);
     return new Response(JSON.stringify({ error: err }));
    }
    finally
    {
        await prisma.$disconnect();
    }
}

export async function POST(request: NextRequest) {
    const prisma = new PrismaClient();
    try{
        // add user to test db
        const user = await prisma.test.create({
            data: {
                email: "test@test.com",
                name: "test"
            },
            
            
        })
        console.log(user);
  

    return new Response(JSON.stringify({ user }));
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({ error: err }));
    }
    finally
    {
        await prisma.$disconnect();
    }

}

export async function PUT(request: NextRequest) {
    const prisma = new PrismaClient();
    try{
        // update user in test db
        const user = await prisma.test.update({
            where: {
                id: 1
            },
            data: {
                email: "update@test.com",
                name: "update"
            }
        })
        console.log(user);
        return new Response(JSON.stringify({ user }));
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({ error: err }));
    }
    finally
    {
        await prisma.$disconnect();
    }
}
