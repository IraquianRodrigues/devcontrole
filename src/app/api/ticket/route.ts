import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";   
import { AuthAction } from "next-auth";
import PrismaClient from '@/lib/prisma'
import { authOptions } from "@/lib/auth";

// CRIANDO NOSSA ROTA
export async function PATCH(request:Request){
    const session = await getServerSession(authOptions)

        if(!session || session.user){
          return NextResponse.json({error: "Not authorized"},  {status: 401})  
        }

        const {id} = await request.json()

        const findTieckt = await PrismaClient.ticket.findFirst({
            where:{
                id: id as string
            }
        })

        console.log(findTieckt)

        return NextResponse.json({message: "teste chamada"})
   
}