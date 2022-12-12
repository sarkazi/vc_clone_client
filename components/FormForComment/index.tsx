import React from "react";
import styles from "./formForComment.module.scss";
import { TextField } from "@mui/material";

import clsx from "clsx";

import { useRouter } from "next/router";

import BtnBlue from "../Buttons/BtnBlue";
import { Api } from "../../utils/api";
import { CommentType } from "../../utils/api/types";

interface FormForCommentProps {
  realTimeComment: (obj: CommentType) => void;
}

const FormForComment: React.FC<FormForCommentProps> = ({ realTimeComment }) => {
  const router = useRouter();

  const [sizeInput, setSizeInput] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const query = +router.query.id;

  const changeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onSendComment = async () => {
    try {
      const data = await Api().comments.createComment({
        text: inputValue,
        postId: query,
      });
      if (data) {
        realTimeComment(data);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
    setInputValue("");
    setSizeInput(false);
  };

  return (
    <div className={clsx(styles.inputBlock, sizeInput && styles.focus)}>
      <TextField
        value={inputValue}
        onChange={(e) => changeInput(e)}
        onFocus={() => setSizeInput(true)}
        margin="normal"
        variant="standard"
        multiline
        classes={{ root: styles.fieldRoot }}
        placeholder="Написать комментарий..."
      ></TextField>
      {sizeInput && (
        <div className={styles.btnBlock}>
          <BtnBlue
            text="Отправить"
            onclick={onSendComment}
            disableRipple={inputValue === "" ? true : false}
            disabled={inputValue === "" ? true : false}
            wide={false}
          />
        </div>
      )}
    </div>
  );
};

export default FormForComment;
