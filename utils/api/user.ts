import axios, { AxiosInstance } from "axios";
import { loginDto, registerDto, responseUser } from "./types";
import { updateUserDto } from "./types";

export const userApi = (instance: AxiosInstance) => ({
  async registerUser(dto) {
    const { data } = await instance.post("/auth/register", dto);
    return data;
  },
  async loginUser(dto) {
    const { data } = await instance.post("/auth/login", dto);
    return data;
  },
  async authMe() {
    const { data } = await instance.get("/users/me");
    return data;
  },
  async updateProfile(formData): Promise<responseUser> {
    const { data } = await instance.patch("/users/me/", formData);
    return data;
  },
  async findAll() {
    const { data } = await instance.get("/users/everything");
    return data;
  },
  async findOne(id: number) {
    const { data } = await instance.get(`/users/${id}`);
    return data;
  },
});
