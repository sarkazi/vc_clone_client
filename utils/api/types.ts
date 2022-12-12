import { OutputData } from "@editorjs/editorjs";
import { type } from "os";

export type postUser = {
  id: number;
  createdAd: string;
  email: string;
  fullName: string;
  password: string;
  updated: string;
  avatarUrl?: string;
  coverUrl?: string;
};

export type updateUser = {
  fullName: string;
  email: string;
};

export type loginDto = {
  email: string;
  password: string;
};
export type registerDto = {
  fullName: string;
} & loginDto;

export type updateUserDto = {
  email?: string;
  password?: string;
  fullName?: string;
  imageUrl?: FileList;
};
export type commentDto = {
  text: string;
  postId: number;
};
export type responseUser = {
  email: string;
  fullName: string;
  id: number;
  createdAd: string;
  updated: string;
  access_token: string;
  avatarUrl?: string;
  commentsCount?: number;
  coverUrl?: string;
};

export type PostType = {
  body: OutputData["blocks"];
  createdAt: string;
  id: number;
  tags: null | string[];
  title: string;
  updated: string;
  views: number;
  imageUrl?: string;
  description: string;
  user: postUser;
  commentsCount: number;
  likesCount: number;
};

export type CommentType = {
  id: number;
  text: string;
  post: PostType;
  user: responseUser | null;
  updated: string;
  createdAd: string;
  likesCount: number;
};

export type SearchPostDto = {
  title?: string;
  body?: string;
  views?: "DESC" | "ASC";
  tag?: string;
  limit?: number;
  take?: number;
};

export type likesCommentDto = {
  postId: number;
  commentId: number;
};

export type sendMessageDto = {
  text: string;
  userTo: number;
  userFrom: number;
  dialogId: number;
};

export type getMessagesDto = {
  userFrom: number;
  userTo: number;
};
