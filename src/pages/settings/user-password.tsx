import SettingsNavBar from "@/components/SettingsNavBar";
import SimpleInputField from "@/components/SimpleInputField";
import { ChangeEvent, useState } from "react";

const UserPasswordSettings = () => {
  const [password, setPassword] = useState({
    prev: "",
    new: "",
  });

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SettingsNavBar>
      <form className="text-center grid gap-4">
        <div className="flex flex-wrap gap-4 justify-center text-left">
          <SimpleInputField
            label="Senha anterior"
            name="prev"
            value={password.prev}
            onChange={updatePassword}
          />

          <SimpleInputField
            label="Nova senha"
            name="new"
            value={password.new}
            onChange={updatePassword}
          />
        </div>

        <button className="text-white bg-custom-blue py-2 px-7 w-64 rounded-md m-auto uppercase">
          Salvar
        </button>
      </form>
    </SettingsNavBar>
  );
};

export default UserPasswordSettings;
