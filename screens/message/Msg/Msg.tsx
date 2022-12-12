import clsx from "clsx";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";
import styles from "./msg.module.scss";

const Msg = ({ message }) => {
  const userData = useAppSelector(selectUserData);

  return (
    <div
      className={clsx(
        message.userFrom.id === userData?.id
          ? styles.myMessage
          : styles.foreignMessage
      )}
    >
      <span>{message.text}</span>
    </div>
  );
};

export default Msg;
