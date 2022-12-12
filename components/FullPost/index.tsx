import React from "react";
import styles from "./fullpost.module.scss";

import { Button } from "@mui/material";

import { PostType } from "../../utils/api/types";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MetricPost from "../MetricPost";
import { GetServerSideProps } from "next";
import { Api } from "../../utils/api";

import Router, { useRouter } from "next/router";
import AvatarBlock from "../AvatarBlock";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import Link from "next/link";

export interface FullPostProps {
  post: PostType;
  commentsCount: number;
}

const FullPost: React.FC<FullPostProps> = ({ post, commentsCount }) => {
  const posts = useAppSelector(selectUserData);

  return (
    <div className={styles.fullPost}>
      <div className={styles.newBlockContainer}>
        <h1 className={styles.title}>{post?.title}</h1>

        <p className={styles.subtitle}>{post?.description}</p>

        <div className={styles.metrics}>
          <div className={styles.metricsLeft}>
            <MetricPost
              visible={false}
              commentsCount={commentsCount}
              showIcon={false}
            />
          </div>
          <span className={styles.viewsCount}>{post?.views} просмотров</span>
        </div>
      </div>
      {post?.imageUrl && (
        <div className={styles.imgBlock}>
          <img alt="" />
        </div>
      )}

      <div className={styles.newBlockContainer}>
        <div className={styles.textBlock}>
          {post?.body?.map((obj) => (
            <p key={obj.id} className={styles.subtitle}>
              {obj.data.text}
            </p>
          ))}
        </div>
        {/*<div className={styles.metricsBlock}>*/}
        <MetricPost
          likesCount={post?.likesCount}
          visible={true}
          padding={false}
          commentsCount={commentsCount}
          showIcon={false}
          marginBottom={true}
          postId={post?.id}
        />
        {/*</div>*/}
        <div className={styles.thisAuthorBlock}>
          <div className={styles.aboutBlock}>
            <Link href={`/profile/${post?.user?.id}`}>
              <div className={styles.avatarPlusName}>
                <AvatarBlock
                  typeAvatar="user"
                  avatarPath={post?.user?.avatarUrl}
                  location="fullPost"
                />
                <h2>{post?.user?.fullName}</h2>
              </div>
            </Link>
            <span>+19 755</span>
          </div>
          <div className={styles.btnBlock}>
            <Button className={styles.btnSend}>
              <SendOutlinedIcon />
              <span>Написать</span>
            </Button>
            <Button>
              <PersonAddIcon />
              <span>Подписаться</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
