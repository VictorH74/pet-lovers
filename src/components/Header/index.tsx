import Link from "next/link"
import { navData } from "./data"

const Header = () => {
    return (
        <div className="w-full h-20 bg-emerald-400 grid place-items-center px-[20px]">
            <div className="flex place-content-between w-[1300px]">
                <h1 className="font-righteous text-2xl text-slate-50">PetLovers</h1>
                <div className="flex gap-x-10">
                    {navData.map(data => (
                        <Link key={data.title} href={data.path}>
                            <p className="text-slate-50 font-noto-sans text-lg">{data.title}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header
