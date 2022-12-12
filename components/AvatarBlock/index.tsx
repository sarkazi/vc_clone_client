import clsx from "clsx";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import styles from "./avatarBlock.module.scss";

interface AvatarBlockProps {
  location: string;
  avatarPath: string;
  userName: string;
}

const AvatarBlock: React.FC<AvatarBlockProps> = ({
  location,
  avatarPath,
  userName,
}) => {
  const userData = useAppSelector(selectUserData);

  return (
    <div
      style={{
        backgroundImage: `url(http://localhost:7777/avatars/${avatarPath})`,
      }}
      className={clsx(
        styles.avatarBlock,
        location === "modalHeaderProfile" && styles.modalHeaderProfile,
        location === "fullPost" && styles.fullPost,
        location === "headerAvatar" && styles.headerAvatar,
        location === "ratingPage" && styles.ratingPage,
        location === "commentNews" && styles.commentNews,
        location === "globalComment" && styles.globalComment,
        location === "messagePageChatName" && styles.messagePageChatName,
        location === "messagePageAbout" && styles.messagePageAbout
      )}
    >
      {!avatarPath && <span>{userName?.[0]}</span>}
    </div>
  );
};

export default AvatarBlock;
