import SettingsNavBar from "@/components/SettingsNavBar";
import { User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import namefieldsData from "./namefieldsData.json";
import accountFieldsData from "./accountFieldsData.json";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import SimpleInputField from "@/components/SimpleInputField";
import { formatLocationToObj, getBaseUrl } from "@/utils/helpers";
import Button from "@/components/Button";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import LocationField from "@/components/LocationField";
import { formatLocationToString } from "@/utils/helpers";
import AccountIcon from "@/components/Header/components/AccountIcon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

type NameData = { name: string; surname: string };

type AccountData = {
  email: string;
  phone: string;
  address: string;
};

type FinalAccountData = {
  email: string;
  phone: string | null;
  location?: string;
};

const UserSettings = ({ user }: { user: User }) => {
  const { data: session, update } = useSession();
  const [nameData, setName] = useState<NameData>({
    name: user.name.split(" ")[0],
    surname: user.name.split(" ")[user.name.split(" ").length - 1] || "",
  });
  const [accountData, setAccountData] = useState<AccountData>({
    email: user.email,
    phone: user.phone || "",
    address: formatLocationToObj(user.location).address || "",
  });
  const [location, setLocation] = useState<string | null>(null);

  const deleteAccount = () => alert("Em desenvolvimento");

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const saveName = async (e: FormEvent) => {
    e.preventDefault();

    let name = "";
    for (let key in nameData) {
      name += nameData[key as keyof typeof nameData] + " ";
    }

    name = name.trim();

    try {
      await fetchJson(`${window.location.origin}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name }),
      });
      update({ name });
      alert("Nome atualizado! 🙂👍");
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.data);
        // setError(error.data);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  const savesetAccountData = async (e: FormEvent) => {
    e.preventDefault();

    let phone = accountData.phone || null;

    let finalAccountData: FinalAccountData = {
      email: accountData.email,
      phone,
    };

    if (location) finalAccountData.location = location;

    // console.log(finalAccountData);

    try {
      await fetchJson(`${window.location.origin}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(finalAccountData),
      });
      // update({ name });

      alert("Dados atualizados! 🙂👍");
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.data);
        // setError(error.data);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  return (
    <SettingsNavBar>
      <form className="grid place-items-center" onSubmit={saveName}>
        <div className="grid place-items-center  @[350px]:flex gap-3 items-center">
          <AccountIcon
            size={100}
            className="mr-2"
            image={session?.user?.image}
          />
          <div
            className="
              border-t-2
              pt-3
              mt-2
              @[350px]:pt-0
              @[350px]:mt-0
              @[350px]:border-t-0
              @[350px]:border-l-2 
              @[350px]:pl-5 
              grid 
              gap-4"
          >
            {namefieldsData.map((data) => (
              <SimpleInputField
                key={data.name}
                {...data}
                inputClassName="w-full @[350px]:max-w-[235px]"
                value={nameData[data.name as keyof typeof nameData]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = e.target;
                  setName((prev) => ({
                    ...prev,
                    [name]: value,
                  }));
                }}
              />
            ))}
          </div>
        </div>
        <Button className="mt-4 w-full @[500px]:max-w-[250px]">Salvar</Button>
      </form>

      <div className="bg-white h-1 w-full rounded-xl" />

      <form
        className="w-full max-w-[500px] m-auto grid gap-4"
        onSubmit={savesetAccountData}
      >
        {accountFieldsData.map((data) => (
          <SimpleInputField
            key={data.name}
            {...data}
            value={accountData[data.name as keyof typeof accountData]}
            onChange={(e) => {
              const { name, value } = e.currentTarget;
              setAccountData((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
          />
        ))}
        <LocationField
          inputElement={<SimpleInputField label="Endereço" />}
          itemHandleClick={(locationObj) =>
            setLocation(formatLocationToString(locationObj))
          }
          value={accountData.address}
        />
        <Button className="m-auto w-full @[500px]:max-w-[250px]">Salvar</Button>
      </form>
    </SettingsNavBar>
  );
};

export const getServerSideProps = async function ({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session?.user) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: null,
      },
    };
  }

  const baseUrl = getBaseUrl(req);

  console.log("Fethcing...");

  const user = await fetchJson(`${baseUrl}/api/users/${session.user.id}`);

  return {
    props: { user: user },
  };
};

export default UserSettings;
