import Image from "next/image";
import targetSvg from "public/target.svg";
import checkSvg from "public/check.svg";
import businessSvg from "public/business.svg";

const Benefits = () => (
  <section className="text-center px-[15px]">
    <div className="relative flex flex-row flex-wrap justify-center gap-20 my-28 min-width m-auto ">
      <div className="flex flex-col gap-4 items-center w-[300px]">
        <Image src={targetSvg} alt="tagert svg" />
        <h2 className="text-2xl font-noto-sans font-semibold">
          Encontre o petshop perfeito para você
        </h2>
        <p className="font-noto-sans font-semibold text-stone-600">
          Tenha acesso a uma ampla variedade de petshops cadastrados, com
          diferentes opções de localização, serviços oferecidos, preços e muito
          mais.
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center w-[300px]">
        <Image src={checkSvg} alt="check svg" />
        <h2 className="text-2xl font-noto-sans font-semibold">
          Facilidade para encontrar petshops/serviços
        </h2>
        <p className="font-noto-sans font-semibold text-stone-600">
          Encontre o petshop mais proximo com base na sua localização e outras
          preferencias, sem precisar perquisar manualmente, perguntar a amigos
          ou sair de casa.
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center w-[300px]">
        <Image src={businessSvg} alt="business svg" />
        <h2 className="text-2xl font-noto-sans font-semibold">
          Expanda seus negócios
        </h2>
        <p className="font-noto-sans font-semibold text-stone-600">
          Cadastre sua Petshop em nossa plataforma e faça parte de um diretório
          abrangente de petshops em sua região para alcançar novos clientes.
        </p>
      </div>
    </div>
  </section>
);

export default Benefits;
