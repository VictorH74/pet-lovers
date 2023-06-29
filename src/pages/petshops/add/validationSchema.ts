import * as Yup from "yup";

export const Schema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório"),
  description: Yup.string()
    .min(5, "Muito curto")
    .max(50, "Muito grande"),
  website: Yup.string()
    .min(5, "Muito curto")
    .max(50, "Muito grande"),
  phone: Yup.string()
    .min(5, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório"),
});
