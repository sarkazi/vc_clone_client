import React from "react";
import styles from "./post.module.scss";

import Link from "next/link";

import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import ModalEditing from "../modals/Editing";

import { useRouter } from "next/router";

import MetricPost from "../MetricPost";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { Api } from "../../utils/api";
import { PostType } from "../../utils/api/types";
import moment from "moment";
import { object } from "yup";

interface PostProps {
  post?: PostType;
  postsState?: PostType[];
  setPostsState?: (posts: PostType[]) => void;
}

const Post: React.FC<PostProps> = ({ post, postsState, setPostsState }) => {
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

  const router = useRouter();
  const [modalStatus, setModalStatus] = React.useState(false);

  const user = useAppSelector(selectUserData);

  const editingPost = () => {
    router.push(`/write/${post.id}`);
  };

  const removePost = () => {
    try {
      if (window.confirm("Вы уверены?")) {
        const data = Api().posts.removePost(post.id);
      }
      setPostsState([...postsState.filter((obj) => obj.id !== post.id)]);
    } catch (err) {
      console.log(err);
      if (err.response) {
        err.response.data.message;
      }
    } finally {
      setModalStatus(false);
    }
  };

  const correctTime = moment(new Date(post?.createdAt)).fromNow();

  const clickMetricComment = () => {
    router.push(`/news/${post.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.infoBlock}>
        <div className={styles.info}>
          <h2>{post?.user?.fullName}</h2>
          <span>{correctTime}</span>
        </div>
        {post?.user?.id === user?.id && (
          <IconButton
            onClick={() => setModalStatus(!modalStatus)}
            disableRipple={true}
            className={styles.updatePostBtn}
          >
            <MoreHorizIcon />
            {modalStatus && (
              <ModalEditing
                location="right"
                editing={editingPost}
                remove={removePost}
              />
            )}
          </IconButton>
        )}
      </div>
      <Link href={`/news/${post?.id}`}>
        <div className={styles.cardText}>
          <h2>{post?.title}</h2>
          <p className={styles.postPargrph}>{post?.description}</p>
        </div>
        {post?.imageUrl && (
          <div className={styles.cardImage}>
            <img src={post?.imageUrl} alt={post?.title} />
          </div>
        )}
      </Link>
      <div className={styles.cardModifications}>
        <MetricPost
          postsState={postsState}
          setPostsState={setPostsState}
          likesCount={post?.likesCount}
          postId={post?.id}
          visible={true}
          padding={true}
          commentsCount={post?.commentsCount}
          clickMetricComment={clickMetricComment}
          showIcon={true}
        />
      </div>
    </div>
  );
};

export default Post;
