import { Container } from '@/components/container'
import { getServerSession } from 'next-auth'
import {authOptions} from "@/lib/auth"
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {TicketItem} from "@/app/dashboard/components/ticket"
import prismaClient  from '@/lib/prisma'


export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  // se o usuario não estiver logado, redirecionar para home
 if(!session || !session.user){
  redirect("/")
 }
 const tickets = await prismaClient.ticket.findMany({
  where:{
    userId: session.user.id,
    status: 'ABERTO'
  },
  include:{
    customer: true,
  }
 })

 console.log(tickets)

  return (
    <Container>
      <main className='mt-9 mb-2'>
      <div className="flex items-center justify-between">
         <h1 className='text-3xl font-bold'>Chamados</h1>
         <Link href="/dashboard/new" className='bg-blue-500 px-4 py-1 rounded text-white'>
         Abrir chamado
         </Link>
       </div>

      <table className='min-w-full my-2'>
       <thead>
        <tr>
          <th className='font-medium text-left pl-1'>CLIENTE</th>
          <th className='font-medium text-left hidden sm:block'>DATA CADASTRO</th>
          <th className='font-medium text-left'>STATUS</th>
          <th className='font-medium text-left'>#</th>
        </tr>
       </thead>
      
      <tbody>
        {tickets.map(ticket =>(
            <TicketItem 
            key={ticket.id}
            customer={ticket.customer}
            ticket={ticket}
            />
        ))}
      </tbody>
       
      </table>

      </main>
    </Container>
  )
}