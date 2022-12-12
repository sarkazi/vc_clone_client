import Post from "../../components/Post";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import React from "react";
import MainWrapper from "../../components/MainWrapper";
import CommentBlock from "../../components/CommentBlock";
import { GetServerSideProps, NextPage } from "next";
import styles from "./bookmarks.module.scss";
import { PostType } from "../../utils/api/types";
import { Api } from "../../utils/api";

interface HomeProps {
  posts: PostType[];
}

const Bookmarks: NextPage<HomeProps> = ({ posts }) => {
  return (
    <MainWrapper>
      <section className={styles.ccBlock}>
        <div className={styles.currentDataBlock}>
          <span className={styles.currentData}>3 ноября</span>
          <KeyboardArrowDownRoundedIcon />
        </div>
        {posts.map((obj) => (
          <Post key={obj.id} post={obj} />
        ))}
      </section>
      <CommentBlock />
    </MainWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const posts = await Api(ctx).posts.getPosts();
    return {
      props: {
        posts,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        posts: null,
      },
    };
  }
};

export default Bookmarks;
