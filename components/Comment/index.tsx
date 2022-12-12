import React from "react";
import styles from "./comment.module.scss";

import Link from "next/link";

import { commentNewsProps } from "../CommentNews";
import moment from "moment";
import AvatarBlock from "../AvatarBlock";

const Comment: React.FC<commentNewsProps> = ({ obj }) => {
  moment.updateLocale("ru", {
    relativeTime: {
      future: "%s",
      past: "%s",
      s: "несколько секунд назад",
      ss: "%d с.",
      m: "минуту назад",
      mm: "%d м.",
      h: "1 ч.",
      hh: "%d ч.",
      d: "1 д.",
      dd: "%d дн.",
      w: "1 нед.",
      ww: "%d нед.",
      M: "1 мес.",
      MM: "%d мес.",
      y: "1 год",
      yy: "%d лет",
    },
  });

  const correctTime = moment(new Date(obj.createdAd)).fromNow();

  return (
    <div className={styles.commentBlock}>
      <Link href={`/profile/${obj.id}`}>
        <Link href={`/profile/${obj.user.id}`}>
          <div className={styles.userBlock}>
            <AvatarBlock
              avatarPath={obj.user.avatarUrl}
              typeAvatar="user"
              location="globalComment"
            />
            <h3>{obj.user.fullName}</h3>
            <span className={styles.correctTime}>{correctTime}</span>
          </div>
        </Link>
      </Link>
      <p className={styles.comment}>{obj.text}</p>
      <div className={styles.linkBlock}>
        <Link className={styles.linkPost} href={`/news/${obj.post.id}`}>
          {obj.post.title}
        </Link>
      </div>
    </div>
  );
};

export default Comment;
