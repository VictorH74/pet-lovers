import { formatAddress, formatPhone } from '@/utils/helpers';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link'
import { PetShop } from '@prisma/client';

const PetshopCard = (props: PetShop) => {
    const address = formatAddress(props.address)

    return (
        <div className='flex flex-col w-[300px] min-h-[330px] text-center justify-between'>
            <div className='grid gap-4' >
                <h2 className='font-noto-sans text-2xl text-emerald-400'>{props.name}</h2>
                {props.description && <h3 className='text-xl text-stone-600'>{props.description}</h3>}
                <div className='grid gap-2'>
                    <div>
                        <p className='font-noto-sans text-xs text-zinc-600 font-semibold'>
                            <LocationOnIcon /> {`${address.street}, N° ${address.number}, ${address.neighborhood}`}
                        </p>
                        <p className='font-noto-sans text-xs text-zinc-600 font-semibold'>
                            {`${address.city} - ${address.stateUF}`}
                        </p>
                    </div>
                    <p className='font-noto-sans text-xs text-zinc-600 font-semibold'>
                        <PhoneIcon /> {formatPhone(props.phone)}
                    </p>
                    <p className='text-stone-600'><StarIcon sx={{ color: "#F6E757" }} />  4.7</p>
                </div>
            </div>
            <Link href={`/petshops/${props.id}`} className='duration-300 hover:scale-105 bg-emerald-400 px-[60px] py-[8px] mx-auto rounded-xl text-white'>VISITAR</Link>
        </div>
    )
}

export default PetshopCard