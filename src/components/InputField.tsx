import TextField from "@mui/material/TextField";
import React from "react";
import type {
  FormikValues,
  FormikErrors,
  FormikTouched,
  FormikHandlers,
} from "formik";

interface Props {
  fieldArray: { label: string; name: string; type?: string }[];
  fieldVariant?: "standard" | "outlined";
  labelColor?: string;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];

  values: FormikValues;
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
}

const Fields: React.FC<Props> = ({
  fieldArray,
  fieldVariant,
  labelColor,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
}) => {
  return (
    <>
      {fieldArray.map((field) => (
        <div key={field.name}>
          <TextField
            sx={{
              width: "100%",
              "& .MuiInput-underline:before": {
                borderBottomColor: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#368FC1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#368FC1",
                },
              },
            }}
            variant={fieldVariant || "standard"}
            className="text-white"
            label={
              <p className={`${labelColor || "text-white"}`}>{field.label}</p>
            }
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            value={values[field.name as keyof typeof values]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors[field.name as keyof typeof errors] &&
            touched[field.name as keyof typeof touched] && (
              <p className="text-right text-red-500 font-semibold uppercase text-xs">
                {String(errors[field.name as keyof typeof errors])}
              </p>
            )}
        </div>
      ))}
    </>
  );
};

export default Fields;
