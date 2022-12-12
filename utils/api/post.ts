import { OutputData } from "@editorjs/editorjs";
import axios, { AxiosInstance } from "axios";
import { loginDto, PostType, registerDto, SearchPostDto } from "./types";

type createPostDto = {
  title: string;
  body: OutputData["blocks"];
};

export const PostApi = (instance: AxiosInstance) => ({
  async getPosts() {
    const { data } = await instance.get<PostType[]>("/posts");
    return data;
  },
  async getOnePost(id: string | string[]) {
    const { data } = await instance.get<PostType>(`/posts/${+id}`);
    return data;
  },
  async create(dto: createPostDto) {
    const { data } = await instance.post<createPostDto, { data: PostType[] }>(
      "/posts",
      dto
    );
    return data;
  },
  async update(id: number, dto: createPostDto) {
    const { data } = await instance.patch(`/posts/${id}`, dto);
    return data;
  },
  async removePost(id: number) {
    const { data } = await instance.delete(`/posts/${id}`);
    return data;
  },
  async getByUser(id: number) {
    const { data } = await instance.get(`/posts/by-user/${id}`);
    return data;
  },
  async search(dto: SearchPostDto) {
    const { data } = await instance.get<{ items: PostType[]; count: number }>(
      "/posts/search",
      {
        params: dto,
      }
    );
    return data;
  },
});
