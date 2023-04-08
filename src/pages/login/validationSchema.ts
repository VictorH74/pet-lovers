import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
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
