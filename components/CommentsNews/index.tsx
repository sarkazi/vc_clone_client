import React from "react";
import styles from "./commentsNews.module.scss";
import Tabs from "../Tabs";
import CommentNews from "../CommentNews";
import FormForComment from "../FormForComment";

//import data from "../../comments.json";
import { CommentType } from "../../utils/api/types";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";

const tabsForCommentBlock = ["Популярные", "Новые"];

interface CommentsNews {
  comments: CommentType[];
}

const CommentsNews: React.FC<CommentsNews> = ({ comments }) => {
  const isAuth = useAppSelector(selectUserData);

  const [commentState, setCommentsState] =
    React.useState<CommentType[]>(comments);

  const realTimeComment = (obj: CommentType) => {
    setCommentsState([obj, ...commentState]);
  };

  return (
    <section id="comments-section" className={styles.commentBlock}>
      <div className={styles.commentsContainer}>
        <h2 className={styles.title}>Все комментарии</h2>
        <Tabs marg={{ marginBottom: "0px" }} tabs={tabsForCommentBlock} />
      </div>
      <div className={styles.line}></div>
      {isAuth && (
        <div className={styles.commentsContainer}>
          <FormForComment realTimeComment={realTimeComment} />
        </div>
      )}
      <div className={styles.commentsContainer}>
        {commentState?.map((obj) => (
          <CommentNews
            key={obj.id}
            setCommentsState={setCommentsState}
            commentState={commentState}
            obj={obj}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentsNews;
