import Post from "../components/Post";
import styles from "../styles/pages/home.module.scss";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Api } from "../utils/api";
import { GetServerSideProps, NextPage } from "next";
import { PostType } from "../utils/api/types";
import React from "react";
import MainWrapper from "../components/MainWrapper";
import CommentBlock from "../components/CommentBlock";
import { useAppSelector } from "../redux/hooks";
import { selectPostData } from "../redux/slices/posts";

interface HomeProps {
  posts: PostType[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  // const postsData = useAppSelector(selectPostData);
  const [postsState, setPostsState] = React.useState<PostType[]>(posts);

  return (
    <MainWrapper>
      <section className={styles.ccBlock}>
        <div className={styles.currentDataBlock}>
          <span className={styles.currentData}>3 ноября</span>
          <KeyboardArrowDownRoundedIcon />
        </div>
        {postsState?.map((post) => (
          <Post
            key={post.id}
            post={post}
            postsState={postsState}
            setPostsState={setPostsState}
          />
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

export default Home;
