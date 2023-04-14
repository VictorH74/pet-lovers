/* eslint-disable react-hooks/exhaustive-deps */
import PetShopFilterBar from "@/components/PetShopFilterBar";
import PetshopCard from "@/components/PetshopCard";
import { PetShop } from "@prisma/client";
import { useEffect, useState } from "react";

const PetshopList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [petshops, setPetshops] = useState<PetShop[] | []>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setNext] = useState(true);
  const [sortDefined, setSortDefined] = useState(false);
  const [sort, setSort] = useState("");

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop + windowHeight >= documentHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setNext(true)
    setPage(1)
  }, [sort]);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasNext) return;

      setIsLoading(true);
      console.log("fetching...");

      console.log(`api/petshops/?page=${page}${sort}`)

      const res = await (
        await fetch(`api/petshops/?page=${page}${sort}`)
      ).json();

      setPetshops(
        page === 1 ? res.data : (prev) => [...prev, ...res.data]
      );
      setNext(res.next);
      // if (sortDefined) setSortDefined(false);
      setIsLoading(false);
    };
    fetchData();
  }, [page, sort]);

  const defineSort = (value: string) => setSort(`&sort=${value}`);

  return (
    <>
      {!isLoading && petshops.length === 0 ? (
        <div className="grid place-items-center">
          <h2 className="text-2xl text-stone-600 my-6">
            Nenhuma Petshop encontrada.
          </h2>
        </div>
      ) : (
        <div className="text-center m-auto w-[100%]">
          <PetShopFilterBar
            disabled={isLoading}
            onClick={defineSort}
          />
          <div className="flex flex-wrap justify-center gap-5 my-[30px]">
            {petshops.map((petshop) => (
              <PetshopCard key={petshop.id} {...petshop} />
            ))}
          </div>
          {isLoading && (
            <div className="grid place-items-center">
              <h2 className="text-2xl text-stone-600 my-6">Carregando...</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PetshopList;
