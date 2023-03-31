import TextField from "@mui/material/TextField";
import React from "react";
import type {
  FormikValues,
  FormikErrors,
  FormikTouched,
  FormikHandlers,
} from "formik";
import type { SxProps } from "@mui/material";

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

export const textFieldStyle: SxProps = {
  width: "100%",
  "& .MuiInput-underline:after": {
    color: "white",
    borderBottomColor: "#368FC1",
  },
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
};

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
        <React.Fragment key={field.name}>
          <TextField
            sx={textFieldStyle}
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
        </React.Fragment>
      ))}
    </>
  );
};

export default Fields;
