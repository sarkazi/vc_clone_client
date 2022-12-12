import { AxiosInstance } from "axios";
import { likesCommentDto } from "./types";

export const LikeApi = (instance: AxiosInstance) => ({
  async putPostLike(id: number) {
    const { data } = await instance.post(`/likesPost/${id}`);
    return data;
  },
  async putCommentLike(dto: likesCommentDto) {
    const { data } = await instance.post("/likesComment", dto);
    return data;
  },
  async removePostLike(id: number) {
    const { data } = await instance.delete(`/likesPost/${id}`);
    return data;
  },
  async removeCommentLike(dto: likesCommentDto) {
    const { data } = await instance.delete("/likesComment", {
      data: dto,
    });
    return data;
  },
});
