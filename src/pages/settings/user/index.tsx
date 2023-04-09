import SettingsNavBar from "@/components/SettingsNavBar";
import { sessionOptions } from "@/lib/session";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { User } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext } from "next";
import namefieldsData from "./namefieldsData.json";
import accountFieldsData from "./accountFieldsData.json";
import React, { FormEvent, useState } from "react";
import SimpleInputField from "@/components/SimpleInputField";
import { formatAddressToObj } from "@/utils/helpers";

type NameData = { name: string; surname: string };
type AccountData = {
  email: string;
  phone: string;
  location: string;
};

const UserSettings = ({ user }: { user: User }) => {
  const [nameData, setName] = useState<NameData>({
    name: user.name.split(" ")[0],
    surname: user.name.split(" ")[user.name.split(" ").length - 1] || "",
  });
  const [accountData, setAccountData] = useState<AccountData>({
    email: user.email,
    phone: user.phone || "",
    location: formatAddressToObj(user.location).address || "",
  });

  const deleteAccount = () => alert("Em desenvolvimento");

  const saveName = async (e: FormEvent) => {
    e.preventDefault();
    console.log(nameData);
  };

  const savesetAccountData = async (e: FormEvent) => {
    e.preventDefault();
    console.log(accountData);
  };

  return (
    <SettingsNavBar>
      <>
        <form className="grid place-items-center" onSubmit={saveName}>
          <div className="flex gap-3 items-center">
            <AccountCircleIcon sx={{ color: "white", fontSize: 100 }} />
            <div className="border-l-2 pl-5 grid gap-4">
              {namefieldsData.map((data) => (
                <SimpleInputField
                  key={data.name}
                  {...data}
                  inputClassName="w-[235px]"
                  value={nameData[data.name as keyof typeof nameData]}
                  onChange={(e) => {
                    const { name, value } = e.currentTarget;
                    setName((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                />
              ))}
            </div>
          </div>
          <button className="text-white bg-custom-blue py-2 px-7 rounded-md mt-4 w-64 uppercase">
            Salvar
          </button>
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
          <button className="text-white bg-custom-blue py-2 px-7 w-64 rounded-md m-auto uppercase">
            Salvar
          </button>
        </form>
      </>
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
