import { AxiosInstance } from "axios";
import { commentDto, CommentType } from "./types";

export const CommentApi = (instance: AxiosInstance) => ({
  async createComment(dto: commentDto) {
    const { data } = await instance.post<CommentType>("/comments", dto);
    return data;
  },
  async getComments(id?: number) {
    const { data } = await instance.get("/comments", {
      params: { id },
    });
    return data;
  },
  async removeComment(id: number) {
    const { data } = await instance.delete(`/comments/${id}`);
    return data;
  },
});
