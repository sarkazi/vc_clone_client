import { NextPageContext, GetServerSidePropsContext } from "next";
import Cookies, { parseCookies } from "nookies";
import axios from "axios";
import { userApi } from "../api/user";
import { PostApi } from "./post";
import { CommentApi } from "./comment";
import { LikeApi } from "./like";
import { MessageApi } from "./message";
import { DialogsApi } from "./dialogs";

export type ApiReturnType = {
  user: ReturnType<typeof userApi>;
  posts: ReturnType<typeof PostApi>;
  comments: ReturnType<typeof CommentApi>;
  likes: ReturnType<typeof LikeApi>;
  message: ReturnType<typeof MessageApi>;
  dialogs: ReturnType<typeof DialogsApi>;
};

export const Api = (ctx: NextPageContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.vc_token;
  const instance = axios.create({
    baseURL: "http://localhost:7777",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    user: userApi(instance),
    posts: PostApi(instance),
    comments: CommentApi(instance),
    likes: LikeApi(instance),
    message: MessageApi(instance),
    dialogs: DialogsApi(instance),
  };
};
