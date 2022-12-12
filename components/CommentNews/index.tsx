import React from "react";
import styles from "./commentNews.module.scss";

import { IconButton, Button, Dialog, List, ListItem } from "@mui/material";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { CommentType } from "../../utils/api/types";
import ModalEditing from "../modals/Editing";

import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Api } from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import moment from "moment";

import LikePost from "../MetricPost/LikePost";
import AvatarBlock from "../AvatarBlock";
import Link from "next/link";

export interface commentNewsProps {
  obj: CommentType;
  commentState: CommentType[];
  setCommentsState: (comments: CommentType[]) => void;
}

const CommentNews: React.FC<commentNewsProps> = ({
  obj,
  commentState,
  setCommentsState,
}) => {
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

  const user = useAppSelector(selectUserData);

  const [statusPopup, setStatusPopup] = React.useState(false);

  const handleClose = () => {
    setStatusPopup(!statusPopup);
  };

  const removeComment = () => {
    if (window.confirm("Вы уверены?")) {
      try {
        const data = Api().comments.removeComment(obj.id);
        setCommentsState([
          ...commentState.filter((comment) => comment.id !== obj.id),
        ]);
      } catch (err) {
        console.log(err);
        if (err.response) {
          err.response.data.message;
        }
      } finally {
        setStatusPopup(false);
      }
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userBlock}>
        <Link href={`/profile/${obj?.user?.id}`}>
          <div className={styles.linkBlock}>
            <AvatarBlock
              avatarPath={obj?.user?.avatarUrl}
              location="commentNews"
            />
            <h3>{obj?.user?.fullName}</h3>
          </div>
        </Link>
        <span className={styles.correctTime}>{correctTime}</span>
      </div>
      <p className={styles.text}>{obj.text}</p>
      <div className={styles.footerComment}>
        {user?.id === obj?.user?.id && (
          <div className={styles.answerBlock}>
            <a href="">Ответить</a>

            <IconButton
              disableRipple={true}
              onClick={() => setStatusPopup(!statusPopup)}
            >
              <MoreHoriz />
              {statusPopup && (
                <ModalEditing
                  editing={() => {}}
                  location={"left"}
                  remove={removeComment}
                />
              )}
            </IconButton>
          </div>
        )}
        <LikePost
          likesCount={obj.likesCount}
          commentId={obj.id}
          postId={obj?.post?.id}
          isMetricProps={false}
          isCommentProps={true}
          location="right"
          commentState={commentState}
          setCommentsState={setCommentsState}
        />
      </div>
    </div>
  );
};

export default CommentNews;
