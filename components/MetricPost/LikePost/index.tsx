import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { IconButton } from "@mui/material";
import styles from "./likePost.module.scss";
import clsx from "clsx";
import { Api } from "../../../utils/api";
import { PostType, CommentType } from "../../../utils/api/types";

import { selectPostData, setPostsIncrement } from "../../../redux/slices/posts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/";
import { useDispatch } from "react-redux";

interface LikePostProps {
  location: string;
  isCommentProps: boolean;
  postId: number;
  likesCount: number;
  postsState: PostType[];
  setPostsState: (arr: PostType[]) => void;
  isMetricProps: boolean;
  commentId: number;
  commentState: CommentType[];
  setCommentsState: (arr: CommentType[]) => void;
}

const LikePost: React.FC<LikePostProps> = ({
  location,
  isCommentProps,
  postId,
  likesCount,
  postsState,
  setPostsState,
  isMetricProps,
  commentId,
  commentState,
  setCommentsState,
}) => {
  const dispatch = useDispatch();
  const postsData = useAppSelector(selectPostData);

  const putPostLike = async () => {
    try {
      const data = await Api().likes.putPostLike(postId);
      setPostsState([
        ...postsState.map((el) =>
          el.id === postId ? { ...el, likesCount: likesCount + 1 } : el
        ),
      ]);
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };
  const putCommentLike = async () => {
    try {
      const data = await Api().likes.putCommentLike({
        postId: postId,
        commentId: commentId,
      });

      setCommentsState([
        ...commentState.map((el) =>
          el.id === commentId ? { ...el, likesCount: likesCount + 1 } : el
        ),
      ]);
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };
  const removePostLike = async () => {
    try {
      const data = await Api().likes.removePostLike(postId);
      setPostsState([
        ...postsState.map((el) =>
          el.id === postId ? { ...el, likesCount: likesCount - 1 } : el
        ),
      ]);
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };
  const removeCommentLike = async () => {
    try {
      const data = await Api().likes.removeCommentLike({
        postId: postId,
        commentId: commentId,
      });

      setCommentsState([
        ...commentState.map((el) =>
          el.id === commentId ? { ...el, likesCount: likesCount - 1 } : el
        ),
      ]);
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div
      className={clsx(
        styles.likePostBlock,
        location && styles.right,
        isCommentProps && styles.isComment
      )}
    >
      <IconButton onClick={isMetricProps ? removePostLike : removeCommentLike}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <span>{likesCount}</span>
      <IconButton onClick={isMetricProps ? putPostLike : putCommentLike}>
        <KeyboardArrowLeftIcon />
      </IconButton>
    </div>
  );
};

export default LikePost;
