import { getBaseUrl } from "@/utils/helpers";
import { PetShop } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
    petshopData: PetShop
}

export default function Petshop({ petshopData: p }: Props) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{p.id}</h1>
            <h1>{p.name}</h1>
            {!!p.description && (<h2>{p.description}</h2>)}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context) ({ notFound: true, });

    const { req, resolvedUrl } = context;

    const baseUrl = getBaseUrl(req);
    const petshopData = await (await fetch(`${baseUrl}/api/${resolvedUrl}/`)).json();

    return {
        props: { petshopData },
    };
}