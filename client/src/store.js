import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import { libraryApi } from "./reducers/libraryApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(libraryApi.middleware),
})

setupListeners(store.dispatch)