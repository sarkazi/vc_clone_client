import React from "react";
import { Api } from "../utils/api";
import { CommentType } from "../utils/api/types";

type useCommentsProps = {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

export const useComments = (id?: number): useCommentsProps => {
  const [comments, setComments] = React.useState<CommentType[]>([]);

  React.useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await Api().comments.getComments();
        setComments(comments);
      } catch (err) {
        console.log(err);
        if (err.response) {
          alert(err.response.data.message);
        }
      }
    };
    getComments();
  }, []);

  return { comments, setComments };
};
