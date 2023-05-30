import TextField from "@mui/material/TextField";
import React from "react";
import type {
  FormikValues,
  FormikErrors,
  FormikTouched,
  FormikHandlers,
  FormikHelpers,
} from "formik";
import type { SxProps } from "@mui/material";
import FileInput from "./FileInput";

interface Props {
  fieldArray: { label: string; name: string; type?: string }[];
  fieldVariant?: "standard" | "outlined";
  labelColor?: string;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
  setFieldValue: FormikHelpers<FormikValues>["setFieldValue"];
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
}

export const textFieldStyle: SxProps = {
  width: "100%",
  "& input": {
    color: "#555555",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    backgroundColor: "transparent",
  },
  "& .MuiInput-underline:after": {
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
  setFieldValue,
  errors,
  touched,
}) => {
  return (
    <>
      {fieldArray.map((field) => (
        <React.Fragment key={field.name}>
          {field.type === "file" ? (
            <FileInput
              handleChange={(file) => {
                const reader = new FileReader();

                console.log(file);

                reader.onload = function (event) {
                  let buffer = null;
                  if (event.target) {
                    const arrayBuffer = event.target.result;

                    buffer = Buffer.from(arrayBuffer as string);
                  }
                  setFieldValue(field.name, buffer);
                };

                if (file) {
                  reader.readAsArrayBuffer(file);
                }
              }}
            />
          ) : (
            <TextField
              sx={textFieldStyle}
              variant={fieldVariant || "standard"}
              className="text-white"
              label={
                field.type ? null : (
                  <p className={`${labelColor || "text-white"}`}>
                    {field.label}
                  </p>
                )
              }
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              // value={values[field.name as keyof typeof values]}
              onChange={async (e) => {
                if (
                  field.type === "file" &&
                  e.currentTarget instanceof HTMLInputElement
                ) {
                  // accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
                  const files = e.currentTarget.files;
                  const reader = new FileReader();

                  reader.onload = function (event) {
                    if (event.target) {
                      const arrayBuffer = event.target.result;
                      console.log(arrayBuffer);
                      let buffer = Buffer.from(arrayBuffer as string);
                      console.log(buffer);
                      setFieldValue(field.name, buffer);
                    }
                  };

                  if (files && files.length > 0) {
                    reader.readAsArrayBuffer(files[0]);
                    return;
                  }
                }
                handleChange(e);
              }}
              onBlur={handleBlur}
            />
          )}
          {errors[field.name as keyof typeof errors] &&
            touched[field.name as keyof typeof touched] && (
              <p className="text-right text-custom-red font-semibold uppercase text-xs">
                {String(errors[field.name as keyof typeof errors])}
              </p>
            )}
        </React.Fragment>
      ))}
    </>
  );
};

export default Fields;
