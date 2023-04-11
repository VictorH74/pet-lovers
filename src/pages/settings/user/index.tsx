import SettingsNavBar from "@/components/SettingsNavBar";
import { sessionOptions } from "@/lib/session";
import { User } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import namefieldsData from "./namefieldsData.json";
import accountFieldsData from "./accountFieldsData.json";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import SimpleInputField from "@/components/SimpleInputField";
import { formatLocationToObj } from "@/utils/helpers";
import Button from "@/components/Button";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import LocationField from "@/components/LocationField";
import { formatLocationToString } from "@/utils/helpers";
import AccountIcon from "@/components/AccountIcon";

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
  const { mutateUser } = useUser();
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
      mutateUser(
        await fetchJson(`${window.location.origin}/api/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name }),
        })
      );
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
      mutateUser(
        await fetchJson(`${window.location.origin}/api/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(finalAccountData),
        })
      );
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
        <div className="flex gap-3 items-center">
          <AccountIcon size={100} className="mr-2" />
          <div className="border-l-2 pl-5 grid gap-4">
            {namefieldsData.map((data) => (
              <SimpleInputField
                key={data.name}
                {...data}
                inputClassName="w-[235px]"
                value={nameData[data.name as keyof typeof nameData]}
                onChange={handleInputChange}
              />
            ))}
          </div>
        </div>
        <Button className="mt-4 w-64">Salvar</Button>
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
        <Button className="w-64 m-auto">Salvar</Button>
      </form>
    </SettingsNavBar>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}: GetServerSidePropsContext) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);

export default UserSettings;
