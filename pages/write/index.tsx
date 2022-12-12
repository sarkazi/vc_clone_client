import { NextPage } from "next";
import React from "react";
import styles from "./write.module.scss";
import Header from "../../components/Header";
import BtnBlue from "../../components/Buttons/BtnBlue";

import { TextField } from "@mui/material";

import dynamic from "next/dynamic";
import { Api } from "../../utils/api";

import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";
import { selectPostData } from "../../redux/slices/posts";

const EditorJs = dynamic(import("../../components/Editor"), {
  ssr: false,
    loading: () => <p>Загрузка редактора ...</p>,
});

const WritePage: NextPage = () => {
  const posts = useAppSelector(selectPostData);

  const [title, setTitle] = React.useState("");
  const [blocks, setBlocks] = React.useState([]);

  const router = useRouter();

  const getEditorData = (blocks) => {
    setBlocks(blocks);
  };

  const createPost = async () => {
    try {
      const posts = await Api().posts.create({ title, body: blocks });
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
            <EditorJs onChange={getEditorData} />
          </section>
          <section className={styles.downBlock}>
            <BtnBlue
              onclick={createPost}
              text="Опубликовать"
              disabled={blocks.length && title ? false : true}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default WritePage;
