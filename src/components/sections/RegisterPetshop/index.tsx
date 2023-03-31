import Image from "next/image";
import Link from "next/link";
import threePets from "public/three-pets.webp";
import bgImg from "public/register-petshop-bg.webp";

const RegisterPetshop = () => (
  <section className="text-center h-[600px] bg-custom-emerald">
    <div
      className="
      relative h-[100%] 
      min-width m-auto 
      flex 
      flex-col 
      items-center 
      bg-[url('/public/register-petshop-bg.webp')]
      "
    >
      <div className="relative flex-auto grid place-items-center max-w-[700px] px-[15px]">
        <h1 className="text-4xl text-white font-noto-sans font-semibold">
          CRIE SEU PRÓPRIO PETSHOP
        </h1>
        <h2 className="font-noto-sans text-3xl text-white">
          Dê asas à sua paixão pelos animais e comece seu próprio negócio com o
          nosso criador de petshop.
        </h2>
        <Link
          href="/petshops/add"
          className="
            text-white 
            bg-custom-blue 
            py-[10px] 
            px-[70px] 
            rounded-xl 
            text-2xl 
            hover:scale-105 
            hover:shadow-lg
            duration-200 
            "
        >
          COMEÇAR
        </Link>
      </div>

      <Image
        className="w-[700px] pointer-events-none"
        src={threePets}
        alt="Animals"
      />
      <Image
        className="absolute  w-full h-full object-cover pointer-events-none"
        src={bgImg}
        alt="bg"
      />
    </div>
  </section>
);

export default RegisterPetshop;
