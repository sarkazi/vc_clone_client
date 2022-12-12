import clsx from "clsx";
import React, { FC } from "react";
import AvatarBlock from "../../../components/AvatarBlock";
import AvatarBlockChat from "../AvatarBlock";
import styles from "./chatName.module.scss";

const ChatName: FC = ({ user }) => {
  return (
    <li className={clsx(styles.itemFriend, styles.active)}>
      <AvatarBlockChat
        userName={user?.fullName}
        user={user}
        location="messagePageChatName"
      />
      <div className={styles.timeAndResponse}>
        <span>13:44</span>
      </div>
    </li>
  );
};

export default ChatName;
