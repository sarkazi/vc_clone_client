import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

import { PostType } from "../../utils/api/types";

export interface postsState {
  data: PostType[] | null;
}
export interface postProps {
  postId: number;
  likesCount: number;
}

const initialState: postsState = {
  data: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    setPostsData: (state, action: PayloadAction<PostType[]>) => {
      state.data = action.payload;
    },
    setPostsIncrement: (state, action: PayloadAction<postProps>) => {
      state.data.map((el) =>
        el.id === action.payload.postId
          ? { ...el, likesCount: action.payload.likesCount + 1 }
          : el
      );
    },
    setPostsDecrement: (state, action: PayloadAction<PostType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        data: action.payload.post.data,
      };
    },
  },
});

export const { setPostsData, setPostsIncrement } = postSlice.actions;

export const selectPostData = (state: AppState) => state.post.data;

export const postReducer = postSlice.reducer;
