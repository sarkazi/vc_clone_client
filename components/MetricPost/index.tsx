import React from "react";
import styles from "./metricPost.module.scss";

import { IconButton } from "@mui/material";

import LikePost from "./LikePost";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

import { PostType } from "../../utils/api/types";
import Link from "next/link";
import clsx from "clsx";

interface MetricPostProps {
  clickMetricComment: () => void;
  showIcon: boolean;
  commentsCount: number;
  padding: boolean;
  visible: boolean;
  marginBottom: boolean;
  postId: number;
  likesCount: number;
  postsState: PostType[];
  setPostsState: () => void;
}

const MetricPost: React.FC<MetricPostProps> = ({
  postId,
  showIcon,
  clickMetricComment,
  commentsCount,
  padding,
  visible,
  marginBottom,
  likesCount,
  postsState,
  setPostsState,
}) => {
  return (
    <section
      style={padding ? { padding: "5px 20px" } : { padding: "5px 0" }}
      className={clsx(styles.metricMain, marginBottom && styles.margin)}
    >
      <div className={styles.actionsPostBlock}>
        <div className={styles.iconBlock}>
          <Link href="#comments-section">
            <IconButton onClick={clickMetricComment}>
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
          </Link>
          <span>{commentsCount}</span>
        </div>
        {showIcon && (
          <div className={styles.iconBlock}>
            <IconButton>
              <ShareOutlinedIcon />
            </IconButton>
            <span></span>
          </div>
        )}
        <div className={styles.iconBlock}>
          <IconButton>
            <BookmarkAddOutlinedIcon />
          </IconButton>
        </div>
        <div className={clsx(styles.iconBlock, !showIcon && styles.noneResize)}>
          <IconButton>
            <IosShareOutlinedIcon />
          </IconButton>
        </div>
      </div>
      {visible && (
        <LikePost
          isMetricProps={true}
          postsState={postsState}
          setPostsState={setPostsState}
          likesCount={likesCount}
          postId={postId}
        />
      )}
    </section>
  );
};

export default MetricPost;
