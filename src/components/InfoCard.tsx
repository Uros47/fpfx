import { TextField } from "@mui/material";
import React from "react";

type InfoCardTypes = {
  data: {};
  infoText: string;
  textColor?: string | null;
};

const InfoCard = ({ data, infoText, textColor }: InfoCardTypes) => {
  return (
    <TextField
      sx={{ input: { color: textColor ? textColor : null } }}
      placeholder={infoText}
      id="outlined-read-only-input"
      value={data}
      InputProps={{
        readOnly: true,
      }}
    />
  );
};

export default InfoCard;
