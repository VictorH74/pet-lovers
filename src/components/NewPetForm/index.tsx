import React from "react";
import FormBase from "../FormBase";
import FormLogo from "../FormLogo";
import WithFormik from "../WithFormik";
import data from "./data.json"
import { petSchema } from "./validationSchema";

interface Props {
  close: () => void;
  handleSubmit: (values: any) => void
}

const NewPetForm: React.FC<Props> = ({ handleSubmit, close }) => {
  return (
    <div className={`fixed left-0 right-0 bottom-0 top-0 bg-[#00000050] duration-200 z-[9999] h-full grid place-items-center overflow-y-auto @container`}>
      <FormBase className="@[500px]:rounded-lg">
        <FormLogo text="Novo pet" />
        <WithFormik
          initialValues={{
            specie: "",
            breed: "",
            age: "",
            price: "",
            aditionalDetails: ""
          }}
          fieldArray={data}
          onSubmit={handleSubmit}
          submitBtnLabel="Salvar"
          validationSchema={petSchema}
          fieldVariant="outlined"
          fieldsContainerClassName="w-full mb-6"
          submitBtnClassName="w-full"
        />
        <button className="m-4 uppercase text-custom-gray" type="button" onClick={close}>Cancelar</button>
      </FormBase>
    </div>
  );
};

export default NewPetForm;
