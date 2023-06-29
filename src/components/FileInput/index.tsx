import { MuiFileInput } from "mui-file-input";
import React, { useState } from "react";
import { textFieldStyle } from "../Fields";

interface Props {
  handleChange: (file: File | null) => void;
}


const FileInput: React.FC<Props> = ({ handleChange }) => {
  const [value, setValue] = useState<File | null>(null);

  return (
    <MuiFileInput
      value={value}
      sx={textFieldStyle}
      onChange={(file) => {
        if (file) {
          if (
            !["jpeg", "jpg", "png"].includes(
              file.type.split("/")[1].toLocaleLowerCase()
            )
          ) {
            alert("Tipo de arquivo não permitido.");
            return;
          }
          if (file.size > 300000) {
            alert("A imagem deve ser menor que 300 KB");
            return;
          }
        }
        handleChange(file);
        setValue(file);
      }}
    />
  );
};

export default FileInput;
