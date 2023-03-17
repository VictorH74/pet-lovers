import Head from 'next/head'
import Link from 'next/link'
import EastIcon from '@mui/icons-material/East';
import { useEffect, useState } from 'react';
import { PetShop } from '@prisma/client';
import PetshopCard from '@/components/PetshopCard';
import presentatioImg from "public/presentation-img.webp"
import threePets from "public/three-pets.webp"
import Image from 'next/image';


// export async function getStaticProps() {
//   const threeFirstsPetshops = await (await fetch("api/petshops/?limit=3")).json()
//   return {
//     props: petshops
//   }
// }


const Presentation = () => {
  return (
    <section className='text-center h-[80vh] bg-custom-emerald px-[15px]'>
      <div className='relative h-[100%] min-width m-auto flex flex-col items-center'>

        <div className='flex-auto grid place-items-center max-w-[1200px]'>
          <h1 className='font-noto-sans text-5xl text-white' >
            Encontre a petshop perfeita para o seu animal de estimação
          </h1>
        </div>

        <Image
          className='translate-y-[22%] w-[1100px]'
          src={presentatioImg} alt="Animals"
        />
      </div>
    </section>
  )
}


const ThreeFirstPetshops = () => {
  const [petshops, setPetshops] = useState<PetShop[] | []>([])

  useEffect(() => {
    const fetchData = async () => {
      const threeFirstsPetshops = await (await fetch("api/petshops/?limit=3")).json()
      setPetshops(threeFirstsPetshops)
    }
    fetchData();
  }, []);
  // 54, 143, 193
  return (
    <section className="text-center my-[50px]">
      <h1 className='font-noto-sans text-5xl text-custom-emerald'
      >Petshops Cadastradas</h1>
      <div className='flex flex-wrap gap-5 justify-center items-center my-[30px]'>
        {petshops.map((petshop) => (
          <PetshopCard key={petshop.id} {...petshop} />
        ))}
      </div>
      <Link className='font-noto-sans font-bold text-xl text-stone-600' href="/petshops">LISTAR TODOS <EastIcon /></Link>
    </section>
  )
}


const RegisterPetshop = () => {
  return (
    <section className='text-center h-[600px] bg-custom-emerald px-[15px]'>
      <div className="
      relative h-[100%] 
      min-width m-auto 
      flex 
      flex-col 
      items-center 
      bg-[url('/public/register-petshop-bg.webp')]
      "
      >
        <div className='flex-auto grid place-items-center max-w-[700px]'>
          <h1 className='font-noto-sans text-3xl text-white' >
            Dê asas à sua paixão pelos animais e comece seu próprio negócio com o nosso criador de petshop.
          </h1>
          <Link
            href="/register-petshop"
            className="
            text-white 
            bg-custom-blue 
            py-[10px] 
            px-[70px] 
            rounded-xl 
            text-2xl 
            hover:scale-105 
            hover:shadow-lg
            duration-200"
          >
            COMEÇAR
          </Link>
        </div>

        <Image
          className='w-[700px] pointer-events-none'
          src={threePets} alt="Animals"
        />
      </div>
    </section>
  )
}


export default function Home() {

  return (
    <main className='m-auto' >
      <Presentation />
      <ThreeFirstPetshops />
      <RegisterPetshop />
    </main>
  )
}