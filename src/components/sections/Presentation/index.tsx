import Image from "next/image";
import presentatioImg from "public/presentation-img.webp";

const Presentation = () => (
  <section className="text-center h-[80vh] bg-custom-emerald px-[15px]">
    <div className="relative h-[100%] min-width m-auto flex flex-col items-center">
      <div className="flex-auto grid place-items-center max-w-[1200px]">
        <h1 className="font-noto-sans text-5xl text-white">
          Encontre a petshop perfeita para o seu animal de estimação
        </h1>
      </div>

      <Image
        className="translate-y-[22%] w-[1100px]"
        src={presentatioImg}
        alt="Animals"
      />
    </div>
  </section>
);

export default Presentation;
