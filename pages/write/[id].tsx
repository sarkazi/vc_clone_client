import { GetServerSideProps, NextPage } from "next";
import React from "react";
import styles from "./write.module.scss";
import Header from "../../components/Header";
import BtnBlue from "../../components/Buttons/BtnBlue";

import { useRouter } from "next/router";

import { TextField } from "@mui/material";

import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import { Api } from "../../utils/api";
import { NextPageContext } from "next/types";
import { PostType } from "../../utils/api/types";

const EditorJs = dynamic(import("../../components/Editor"), {
  ssr: false,
  loading: () => <p>Загрузка редактора ...</p>,
});

interface writePageProps {
  post: PostType;
}

const WritePage: NextPage<writePageProps> = ({ post }) => {
  const router = useRouter();

  const [title, setTitle] = React.useState(post?.title || "");
  const [blocks, setBlocks] = React.useState(post?.body || []);

  const getEditorData = (blocks) => {
    setBlocks(blocks);
  };

  const updatePost = async () => {
    try {
      const obj = {
        title,
        body: blocks,
      };
      const posts = await Api().posts.update(post.id, obj);
      router.push("/");
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.write}
            placeholder="Заголовок"
          />
          <section className={styles.editor}>
            <EditorJs value={post.body} onChange={getEditorData} />
          </section>
          <section className={styles.downBlock}>
            <BtnBlue
              onclick={updatePost}
              text="Сохранить"
              disabled={blocks.length && title ? false : true}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const post = await Api(ctx).posts.getOnePost(ctx.params.id);
    const user = await Api(ctx).user.authMe();

    if (post.user.id !== user[0].id) {
      return {
        props: {},
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        post,
      },
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default WritePage;
