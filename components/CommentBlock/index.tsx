import React from "react";
import styles from "./commentBlock.module.scss";
import Comment from "../Comment";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { CommentType } from "../../utils/api/types";

import clsx from "clsx";
import { PostType } from "../../utils/api/types";
import { Api } from "../../utils/api";
import { useComments } from "../../hooks/useComments";

const CommentBlock: React.FC = () => {
  const [visibleBlock, setVisibleBlock] = React.useState<boolean>(true);
  const { comments, setComments } = useComments();

  const onToggleBlock = () => {
    setVisibleBlock(!visibleBlock);
  };

  return (
    <section className={styles.commentsBlock}>
      <div className={styles.wrapper}>
        <button
          onClick={onToggleBlock}
          className={clsx(styles.buttonBlock, !visibleBlock && styles.hide)}
        >
          <h2>Комментарии</h2>
          <KeyboardArrowDownRoundedIcon />
        </button>
        {visibleBlock && (
          <section className={styles.commentsItems}>
            {comments.map((obj) => (
              <Comment key={obj.id} obj={obj} />
            ))}
          </section>
        )}
      </div>
    </section>
  );
};

export default CommentBlock;
