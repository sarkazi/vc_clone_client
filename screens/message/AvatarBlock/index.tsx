import React, { FC } from "react";
import AvatarBlock from "../../../components/AvatarBlock";
import { responseUser } from "../../../utils/api/types";
import styles from "./avatarBlock.module.scss";

interface IAvatarBlockChatProps {
  location: string;
  userName: string;
  user: responseUser;
}

const AvatarBlockChat: FC<IAvatarBlockChatProps> = ({
  location,
  userName,
  user,
}) => {
  return (
    <>
      <AvatarBlock
        userName={userName}
        avatarPath={user?.avatarUrl}
        location={location}
      />
      <div className={styles.mainBody}>
        <span>{user?.fullName}</span>
        <p>Привет</p>
      </div>
    </>
  );
};

export default AvatarBlockChat;
