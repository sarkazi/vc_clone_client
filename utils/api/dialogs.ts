import { AxiosInstance } from "axios";

export const DialogsApi = (instance: AxiosInstance) => ({
  async getMyDialogs() {
    const { data } = await instance.get("/dialogs/my");
    return data;
  },
  async createDialog(id: number) {
    const { data } = await instance.post(`/dialogs/${id}`);
    return data;
  },
  async findOne(id: number) {
    const { data } = await instance.get(`/dialogs/${id}`);
    return data;
  },
});
