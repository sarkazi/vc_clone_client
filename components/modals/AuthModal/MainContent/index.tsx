import React from "react";
import styles from "./mainContent.module.scss";

import CloseIcon from "@mui/icons-material/Close";

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Input,
} from "@mui/material";

const buttonsEnterAcc = {
  big: [
    { text: "Почта", img: "/img/modals/auth-modal/message.svg" },
    { text: "Вконтакте", img: "/img/modals/auth-modal/vk.svg" },
    { text: "Google", img: "/img/modals/auth-modal/google.svg" },
  ],
  small: [
    { img: "/img/modals/auth-modal/fb.svg" },
    { img: "/img/modals/auth-modal/twitter.svg" },
    { img: "/img/modals/auth-modal/apple.svg" },
  ],
};
const buttonsRegAcc = [
  { text: "Почта", img: "/img/modals/auth-modal/message.svg" },
  { text: "Google", img: "/img/modals/auth-modal/google.svg" },
  { text: "Apple", img: "/img/modals/auth-modal/apple.svg" },
];

const MainContent = ({
  statusUser,
  showInputsMail,
  handleClose,
  setStatusUser,
  isMailRegister,
  setIsMailRegister,
}) => {
  const pushBtnMailEnter = (text) => {
    showInputsMail(text);
    setIsMailRegister(false);
  };
  const pushBtnMailReg = (text) => {
    showInputsMail(text);
    setIsMailRegister(true);
  };

  return (
    <>
      <IconButton
        onClick={handleClose}
        disableRipple={true}
        className={styles.closeBtn}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle className={styles.title} id="responsive-dialog-title">
        {statusUser === "login" ? "Вход в аккаунт" : "Регистрация"}
      </DialogTitle>

      <DialogActions className={styles.btnBlock}>
        <div className={styles.verticalBtnBlock}>
          {statusUser === "login"
            ? buttonsEnterAcc.big.map((obj) => (
                <Button
                  onClick={() => pushBtnMailEnter(obj.text)}
                  key={obj.text}
                >
                  <img src={obj.img} alt="" />
                  {obj.text}
                </Button>
              ))
            : buttonsRegAcc.map((obj) => (
                <Button onClick={() => pushBtnMailReg(obj.text)} key={obj.text}>
                  <img src={obj.img} alt="" />
                  {obj.text}
                </Button>
              ))}
        </div>
        {statusUser === "login" && (
          <div className={styles.smallButtons}>
            {buttonsEnterAcc.small.map((obj) => (
              <Button key={obj.img} className={styles.iconRounded}>
                <img src={obj.img} alt="" />
              </Button>
            ))}
          </div>
        )}
      </DialogActions>

      {statusUser === "login" ? (
        <button
          onClick={() => setStatusUser("reg")}
          className={styles.onRegister}
        >
          <span>Регистрация</span>
        </button>
      ) : (
        <div className={styles.enterBtnBlock}>
          <h3>Есть аккаунт?</h3>
          <button
            onClick={() => setStatusUser("login")}
            className={styles.onRegister}
          >
            <span>Войти</span>
          </button>
        </div>
      )}
    </>
  );
};

export default MainContent;
