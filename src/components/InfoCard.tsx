import { CardData } from "@/types/Types";
import { TextField } from "@mui/material";
import React from "react";

type InfoCardTypes = {
  data: CardData | undefined;
  infoText: string;
  textColor?: string | "";
};

const InfoCard = ({ data, infoText, textColor }: InfoCardTypes) => {
  return (
    <TextField
      sx={{ input: { color: textColor ? textColor : "" } }}
      label={infoText}
      id="outlined-read-only-input"
      value={data}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        readOnly: true,
      }}
    />
  );
};

export default InfoCard;
