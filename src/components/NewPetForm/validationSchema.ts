import * as Yup from "yup";

export const petSchema = Yup.object().shape({
    specie: Yup.string()
    .min(2, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório"),
    breed: Yup.string()
    .min(2, "Muito curto")
    .max(50, "Muito grande")
    .required("Obrigatório"),
    age: Yup.string()
    .min(1, "Muito curto")
    .max(15, "Muito grande")
    .required("Obrigatório"),
    price: Yup.string()
    .min(1, "Muito curto")
    .max(20, "Muito grande")
    .required("Obrigatório"),
    aditionalDetails: Yup.string()
    .min(5, "Muito curto")
    .max(150, "Muito grande"),
});
