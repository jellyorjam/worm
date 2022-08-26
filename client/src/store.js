import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import bookReducer from "./reducers/bookSlice";
import insightsReducer from "./reducers/insightsSlice";
import { libraryApi } from "./reducers/libraryApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    user: userReducer,
    books: bookReducer,
    insights: insightsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(libraryApi.middleware),
})

setupListeners(store.dispatch)