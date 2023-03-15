import Head from 'next/head'
import Link from 'next/link'
import EastIcon from '@mui/icons-material/East';
import { useEffect, useState } from 'react';
import { PetShop } from '@prisma/client';
import PetshopCard from '@/components/PetshopCard';


// export async function getStaticProps() {
//   const threeFirstsPetshops = await (await fetch("api/petshops/?limit=3")).json()
//   return {
//     props: petshops
//   }
// }

const ThreePetshops = () => {
  const [petshops, setPetshops] = useState<PetShop[] | []>([])

  useEffect(() => {
    const fetchData = async () => {
      const threeFirstsPetshops = await (await fetch("api/petshops/?limit=3")).json()
      setPetshops(threeFirstsPetshops)
    }
    fetchData();
  }, []);

  return (
    <section className='text-center'>
      <h1 className='font-noto-sans text-4xl text-emerald-400'
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

export default function Home() {


  return (
    <>
      <main >
        <ThreePetshops />
      </main>
    </>
  )
}