import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório"),
  password: Yup.string()
    .min(5, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório")
});
