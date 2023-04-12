import Button from "@/components/Button";
import ErrorMsg from "@/components/ErrorMsg";
import SettingsNavBar from "@/components/SettingsNavBar";
import SimpleInputField from "@/components/SimpleInputField";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { Session, getServerSession } from "next-auth";
import { getBaseUrl } from "@/utils/helpers";

type MessageError = { message: string; status?: number } | null;

type ResponseError = {
  prevPassword: MessageError;
  newPassword: MessageError;
};

var hasError = false;

const UserPasswordSettings = ({ user }: { user: User }) => {
  const [responseError, setError] = useState<ResponseError>({
    prevPassword: null,
    newPassword: null,
  });
  const [password, setPassword] = useState<{
    prevPassword: string;
    newPassword: string;
  }>({
    prevPassword: "",
    newPassword: "",
  });

  const verifyPassword = (key: string, pass?: boolean) => {
    if (!password[key as keyof typeof password] && !pass) {
      setError((prev) => ({ ...prev, [key]: { message: "Obrigatório" } }));
      hasError = true;
    } else if (password[key as keyof typeof password].length < 8 && !pass) {
      setError((prev) => ({
        ...prev,
        [key]: { message: "Deve ter ao menos 8 caractéres" },
      }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, [key]: null }));
    }
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = async (e: FormEvent) => {
    e.preventDefault();

    verifyPassword("prevPassword", user.password === null);
    verifyPassword("newPassword");

    if (hasError) return;

    try {
      await fetchJson(
        `${window.location.origin}/api/users/${user.id}/set-password`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(password),
        }
      );

      alert("Senha alterada com sucesso!");

      if (!user.password) window.location.reload();
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.data);
        let errorObj = error.data;
        setError((prev) => ({ ...prev, prevPassword: errorObj }));
      }
    }
  };

  return (
    <SettingsNavBar>
      <form className="text-center grid gap-4" onSubmit={handlerSubmit}>
        <div className="flex flex-wrap gap-4 justify-center text-left">
          {user.password && (
            <div>
              <SimpleInputField
                labelClassName="uppercase"
                label="Senha anterior"
                name="prevPassword"
                value={password.prevPassword}
                onChange={updatePassword}
              />
              {responseError.prevPassword && (
                <ErrorMsg>{responseError.prevPassword.message}</ErrorMsg>
              )}
            </div>
          )}

          <div className={user.password ? "" : "max-w-[255px] w-full"}>
            <SimpleInputField
              labelClassName="uppercase"
              label={user.password ? "Nova senha" : "Definir senha"}
              name="newPassword"
              value={password.newPassword}
              onChange={updatePassword}
            />
            {responseError.newPassword && (
              <ErrorMsg>{responseError.newPassword.message}</ErrorMsg>
            )}
          </div>
        </div>

        <Button className="max-w-[255px] w-full m-auto">Salvar</Button>
      </form>
    </SettingsNavBar>
  );
};

export const getServerSideProps = async function ({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
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

  let userData: User | any | null = null;

  try {
    userData = await fetchJson(`${baseUrl}/api/users/${session.user.id}`);
  } catch (error) {
    if (error instanceof FetchError && error.data.status === 404) {
      userData = session.user;
    }
  }

  return {
    props: { user: userData },
  };
};

export default UserPasswordSettings;
