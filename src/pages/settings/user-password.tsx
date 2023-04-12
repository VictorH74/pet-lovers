import Button from "@/components/Button";
import SettingsNavBar from "@/components/SettingsNavBar";
import SimpleInputField from "@/components/SimpleInputField";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

const ErrorMsg = ({ children }: { children: string }) => (
  <p className="text-right uppercase text-red-600 text-xs font-semibold">
    {children}
  </p>
);

type MessageError = { message: string; status?: number } | null;

type ResponseError = {
  prevPassword: MessageError;
  newPassword: MessageError;
};

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

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let hasError = false;

    for (let key in password) {
      if (!password[key as keyof typeof password]) {
        setError((prev) => ({ ...prev, [key]: { message: "Obrigatório" } }));
        hasError = true;
      } else if (password[key as keyof typeof password].length < 8) {
        setError((prev) => ({
          ...prev,
          [key]: { message: "Deve ter ao menos 8 caractéres" },
        }));
        hasError = true;
      } else {
        setError((prev) => ({ ...prev, [key]: null }));
      }
    }

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

          <div>
            <SimpleInputField
              labelClassName="uppercase"
              label="Nova senha"
              name="newPassword"
              value={password.newPassword}
              onChange={updatePassword}
            />
            {responseError.newPassword && (
              <ErrorMsg>{responseError.newPassword.message}</ErrorMsg>
            )}
          </div>
        </div>

        <Button className="w-64 m-auto">Salvar</Button>
      </form>
    </SettingsNavBar>
  );
};

export const getServerSideProps = async function ({
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
};

export default UserPasswordSettings;
