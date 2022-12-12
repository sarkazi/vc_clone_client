import React from "react";
import styles from "./btnBlue.module.scss";
import { Button } from "@mui/material";
import clsx from "clsx";
import NoSsr from "@mui/base/NoSsr";

interface BtnBlueProps {
  disabled?: boolean;
  disableRipple?: boolean;
  onclick?: () => void;
  wide?: boolean;
  text: string;
  submit?: boolean;
}

const BtnBlue: React.FC<BtnBlueProps> = ({
  disabled,
  disableRipple,
  onclick,
  wide,
  text,
  submit,
}) => {
  return (
    <Button
      type={submit ? "submit" : "button"}
      disabled={disabled ? true : false}
      onClick={onclick}
      disableRipple={disableRipple}
      style={
        disabled
          ? { backgroundColor: "#b6cceb" }
          : { backgroundColor: "#4683d9" }
      }
      className={clsx(styles.btnBlue, wide && styles.btnWide)}
    >
      {text}
    </Button>
  );
};

export default BtnBlue;
