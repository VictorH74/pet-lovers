import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório"),
  email: Yup.string()
    .min(5, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório")
    .email("Formato de email inválido"),
  password: Yup.string()
    .min(8, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório")
});
