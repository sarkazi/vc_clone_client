import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { responseUser } from "../../utils/api/types";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

export interface userState {
  data: responseUser | null;
}

const initialState: userState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUserData: (state, action: PayloadAction<responseUser>) => {
      state.data = action.payload;
    },
    logOutUser: (state) => {
      state.data = null;
    },
    changeAvatar: (state, action: PayloadAction<string>) => {
      state.data.avatarUrl = action.payload;
    },
    changeCover: (state, action: PayloadAction<string>) => {
      state.data.coverUrl = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        data: action.payload.user.data,
      };
    },
  },
});

export const { setUserData, logOutUser, changeAvatar, changeCover } =
  userSlice.actions;

export const selectUserData = (state: AppState) => state.user.data;

export const userReducer = userSlice.reducer;
