import Image from 'next/image'
import horoImg from '../assets/hero.svg'

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">Atendimentos, clientes</h1>
      <Image
        src={horoImg}
        alt="Imagem hero do dev controle"
        width={600}
        className="max-w-sm md:max-w-xl"
      />  
      <footer className="mt-10">
       <span className="font-bold flex">Desenvolvido com ❤️ por Iraquian Rodrigues</span>
     </footer>

    </main>     
  )
}
