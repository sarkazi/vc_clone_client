import React from "react";
import styles from "./authModal.module.scss";

import MailContent from "./MailContent";
import MainContent from "./MainContent";

import { Dialog, DialogContent } from "@mui/material";

interface AuthModalProps {
  open: boolean;
  handleClose: () => void;
  handleClickOpen: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  handleClose,
  handleClickOpen,
}) => {
  const [statusUser, setStatusUser] = React.useState<
    "login" | "reg" | "mailLogin"
  >("login");

  const [isMailRegister, setIsMailRegister] = React.useState<true | false>(
    true
  );

  const showInputsMail = (text) => {
    if (text === "Почта") {
      setStatusUser("mailLogin");
    }
  };

  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth={true}
      className={styles.dialog}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent className={styles.wrapper}>
        <section className={styles.leftBlock}>
          <img src="/img/modals/auth-modal/logo.png" alt="" />
        </section>
        <section className={styles.rightBlock}>
          {statusUser === "mailLogin" ? (
            <MailContent
              setStatusUser={setStatusUser}
              handleClose={handleClose}
              statusUser={statusUser}
              isMailRegister={isMailRegister}
              setIsMailRegister={setIsMailRegister}
            />
          ) : (
            <MainContent
              setIsMailRegister={setIsMailRegister}
              isMailRegister={isMailRegister}
              statusUser={statusUser}
              handleClose={handleClose}
              showInputsMail={showInputsMail}
              setStatusUser={setStatusUser}
            />
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
