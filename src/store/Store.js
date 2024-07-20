import { configureStore } from "@reduxjs/toolkit";
import tmovies2Reducer from "./tmovies2";
export const Store = configureStore({
  reducer: {
    MovieData:tmovies2Reducer
  },
});
