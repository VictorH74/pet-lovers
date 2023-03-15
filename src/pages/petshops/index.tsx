import PetshopCard from "@/components/PetshopCard";
import { PetShop } from "@prisma/client"
import { use, useEffect, useState } from "react"

export default function PetshopList() {
    const [isLoading, setIsLoading] = useState(true)
    const [petshops, setPetshops] = useState<PetShop[] | []>([])

    useEffect(() => {
        const fetchData = async () => {
            const threeFirstsPetshops = await (await fetch("api/petshops/?page=1")).json()
            setPetshops(threeFirstsPetshops);
            setIsLoading(false)
        }
        fetchData();
    }, []);

    if (isLoading) (<div>Loading...</div>)

    return (
        <section className='text-center m-auto w-[100%]'>
            <div className='grid grid-cols-4 place-items-center gap-5 my-[30px]'>
                {petshops.map((petshop) => (
                    <PetshopCard key={petshop.id} {...petshop} />
                ))}
            </div>
        </section>
    )
}