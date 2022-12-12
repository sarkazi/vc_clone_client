import React from "react";
import styles from "./news.module.scss";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import CommentBlock from "../../components/CommentBlock";
import FullPost from "../../components/FullPost";
import Tabs from "../../components/Tabs";
import CommentsNews from "../../components/CommentsNews";
import { GetServerSideProps, NextPage } from "next";
import { PostType } from "../../utils/api/types";
import { Router, useRouter } from "next/router";
import { Api } from "../../utils/api";

import MainWrapper from "../../components/MainWrapper";

import { CommentType } from "../../utils/api/types";

export interface NewsPostProps {
  post: PostType;
  comments: CommentType[];
}

const News: NextPage<NewsPostProps> = ({ post, comments }) => {
  const widthItemNavbar = {
    maxWidth: "100%",
  };
  return (
    <MainWrapper width={true} sizePage={"newsPage"}>
      <section className={styles.newsBlock}>
        <FullPost commentsCount={comments?.length} post={post} />
        <CommentsNews comments={comments} />
      </section>
      <CommentBlock />
    </MainWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const post = await Api(ctx).posts.getOnePost(ctx.params.id);
    const comments = await Api(ctx).comments.getComments(+ctx.params.id);

    return {
      props: {
        post,
        comments,
      },
    };
  } catch (err) {
    return {
      props: {
        post: null,
        comments: null,
      },
    };
  }
};

export default News;
