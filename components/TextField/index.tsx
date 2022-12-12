import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./input.module.scss";
import { Input } from "@mui/material";
import clsx from "clsx";

import dataInput from "../modals/AuthModal/MailContent";

interface TextFieldProps {
  name: string;
  dataInputs: typeof dataInput;
  setDataInputs: (fullName: string, email: string, password: string) => void;
  placeholder: string;
  keyInput: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  dataInputs,
  setDataInputs,
  placeholder,
  keyInput,
  ref,
}) => {
  const { register, formState } = useFormContext();

  return (
    <label className={styles.label}>
      <Input
        {...register(name)}
        name={name}
        value={keyInput}
        onChange={(e) =>
          setDataInputs({ ...dataInputs, [name]: e.target.value })
        }
        placeholder={placeholder}
        className={clsx(
          styles.inputMail,
          formState.errors[name] && styles.borderError
        )}
      ></Input>
      {formState.errors[name] && (
        <p className={styles.textValidation}>
          {formState.errors[name].message}
        </p>
      )}
    </label>
  );
};

export default TextField;
