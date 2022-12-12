import { AxiosInstance } from "axios";
import { commentDto, CommentType, getMessagesDto } from "./types";
import { sendMessageDto } from "./types";

export const MessageApi = (instance: AxiosInstance) => ({
  async createMessage(dto: sendMessageDto) {
    const { data } = await instance.post("/messages/", dto);
    return data;
  },
  async getMessages(dto: getMessagesDto) {
    const { data } = await instance.get("/messages", {
      params: {
        userTo: dto.userTo,
        userFrom: dto.userFrom,
      },
    });
    return data;
  },
});
