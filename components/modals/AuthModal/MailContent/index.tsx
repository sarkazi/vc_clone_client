import React from "react";
import styles from "./mailContent.module.scss";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";

import { setCookie } from "nookies";

import Alert from "@mui/material/Alert";

import { userApi } from "../../../../utils/api/user";

import { selectUserData, setUserData } from "../../../../redux/slices/user";

import TextField from "../../../TextField";

import {
  loginFormSchema,
  registerFormSchema,
} from "../../../../utils/schemas/loginValidation";

import clsx from "clsx";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Input,
} from "@mui/material";

import BtnBlue from "../../../Buttons/BtnBlue";
import { loginDto, registerDto } from "../../../../utils/api/types";
import { useDispatch } from "react-redux";
import { Api } from "../../../../utils/api";

export interface dataInput {
  fullName: string;
  email: string;
  password: string;
}

interface MailContentProps {
  setStatusUser: () => void;
  setIsAuth: () => void;
  handleClose: (s: boolean) => void;
  statusUser: string;
  isMailRegister: boolean;
  setIsMailRegister: (s: boolean) => void;
}

const MailContent: React.FC<MailContentProps> = ({
  setStatusUser,
  setIsAuth,
  handleClose,
  statusUser,
  isMailRegister,
  setIsMailRegister,
}) => {
  const dispatch = useDispatch();

  const form = !isMailRegister
    ? useForm({
        resolver: yupResolver(loginFormSchema),
        mode: "onChange",
      })
    : useForm({
        resolver: yupResolver(registerFormSchema),
        mode: "onChange",
      });

  const [dataInputs, setDataInputs] = React.useState<dataInput>({
    fullName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = (data) => console.log(data);

  const { fullName, ...loginData } = dataInputs;

  console.log(loginData);

  const registerMe = async () => {
    try {
      const data = await Api().user.registerUser(dataInputs);
      setCookie(null, "vc_token", data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setErrorMessage("");
      setIsMailRegister(false);
      setDataInputs({});
      form.reset();
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  const loginMe = async () => {
    try {
      const data = await Api().user.loginUser(loginData);
      setCookie(null, "vc_token", data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      dispatch(setUserData(data));
      setErrorMessage("");
      setDataInputs({});
      handleClose(true);
      form.reset();
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setStatusUser("login")}
        className={styles.returnBlock}
      >
        <KeyboardArrowDownRoundedIcon />
        <span>Назад</span>
      </button>
      <DialogTitle className={styles.title} id="responsive-dialog-title">
        {isMailRegister ? "Регистрация" : "Вход в аккаунт"}
      </DialogTitle>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.formInputs}
        >
          {isMailRegister && (
            <TextField
              keyInput={dataInputs.fullName}
              name={"fullName"}
              dataInputs={dataInputs}
              setDataInputs={setDataInputs}
              placeholder={"Имя и Фамилия"}
            />
          )}
          <TextField
            keyInput={dataInputs.email}
            name={"email"}
            dataInputs={dataInputs}
            setDataInputs={setDataInputs}
            placeholder={"Email"}
          />
          <TextField
            keyInput={dataInputs.password}
            name={"password"}
            dataInputs={dataInputs}
            setDataInputs={setDataInputs}
            placeholder={"Пароль"}
          />
          {errorMessage && (
            <Alert className={styles.alertBlock} severity="error">
              {errorMessage}
            </Alert>
          )}
          <BtnBlue
            submit={true}
            text={isMailRegister ? "Зарегистироваться" : "Войти"}
            disableRipple={
              !dataInputs.email ||
              !dataInputs.password ||
              (!dataInputs.fullName && isMailRegister) ||
              form.formState.isSubmitting
                ? true
                : false
            }
            disabled={
              !dataInputs.email ||
              !dataInputs.password ||
              (!dataInputs.fullName && isMailRegister) ||
              form.formState.isSubmitting
                ? true
                : false
            }
            onclick={isMailRegister ? registerMe : loginMe}
            wide={true}
          ></BtnBlue>
        </form>
      </FormProvider>
      <ul className={styles.linksBlock}>
        {!isMailRegister && (
          <li>
            <button className={styles.onRegister}>
              <span>Забыли пароль?</span>
            </button>
          </li>
        )}
        <li>
          {isMailRegister ? (
            <div className={styles.enterBtnBlock}>
              <h3>Есть аккаунт?</h3>
              <button
                onClick={() => setStatusUser("login")}
                className={styles.onRegister}
              >
                <span>Войти</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setStatusUser("reg")}
              className={styles.onRegister}
            >
              <span>Регистрация</span>
            </button>
          )}
        </li>
      </ul>
    </>
  );
};

export default MailContent;
