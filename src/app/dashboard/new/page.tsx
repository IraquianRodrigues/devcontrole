import { Container } from "@/components/container"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prismcaClient from '@/lib/prisma'

export default async function NewTicket(){

    // privar nossa rota
    const session = await getServerSession(authOptions)
    if(!session || !session.user){
        redirect("/")
    }

    // buscar clientes para mostrar na nossa lista
    const customers  = await prismcaClient.customer.findMany({
        where:{
            userId: session.user.id
        }
    })

   async function handleRegisterTicket(formData: FormData){
      "use server"

      const name = formData.get("name")
      const description = formData.get("description")
      const customerId = formData.get("customer")

      if(!name || !description || !customerId){
        return
      }

      await prismcaClient.ticket.create({
        data:{
          name: name as string,
          descripiton: description as string,
          customerId: customerId as string,
          status: 'ABERTO',
          userId: session?.user.id
        }
      })

      redirect("/dashboard")
     
    }

    return(
 <Container>
      <main className="mt-9 mb-2">
          <div className="flex items-center gap-3">
             <Link href="/dashboard" className="text-white px-3 py-1 rounded bg-gray-900">
                Voltar
             </Link>
             <h1 className=" text-3xl font-bold">Novo chamado</h1>
         </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
            <label className="mb-1 fonte-medium text-lg"> Nome do chamado</label>
            <input
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            type="text"
            placeholder="Digite o nome do chamado"
            required
            name="name"
            />

            <label className="mb-1 fonte-medium text-lg">Descreva o problema...</label>
            <textarea
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            placeholder="Descreva o problema"
            required
            name="description"
            ></textarea>

          {customers.length !== 0 && (
            <>
              <label className="mb-1 fonte-medium text-lg">Selecione o cliente</label>
            <select
            className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
            name="customer"
            value="cliente1">Cliente 1
                {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
            </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
            Você ainda não tem nenhum cliente, <span className="text-blue-500 font-medium">Cadastrar cliente</span></Link>
          )}

          <button type="submit" className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled: bg-gray-400 disabled:cursor-not-allowed"
          disabled={customers.length === 0}
          > 
            Cadastrar
          </button>
            
        </form>

     </main>
 </Container>
 )
}