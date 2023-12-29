import { CardData } from "@/types/Types";
import { TextField } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

type InfoCardTypes = {
  data: number | undefined;
  infoText: string;
  textColor?: string | "";
};

const InfoCard = ({ data, infoText, textColor }: InfoCardTypes) => {
  const theme = useTheme();
  return (
    <TextField
      sx={{
        input: {
          color: textColor ? textColor : "",
        },
      }}
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
