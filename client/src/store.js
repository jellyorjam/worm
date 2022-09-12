import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import accessibilityReducer from "./reducers/accessibilitySlice"
import insightsReducer from "./reducers/insightsSlice";
import { libraryApi } from "./reducers/libraryApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { openLibraryApi } from "./reducers/openLibraryApi";
import { googleBooksApi } from "./reducers/googleBooksApi";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    [openLibraryApi.reducerPath]: openLibraryApi.reducer,
    [googleBooksApi.reducerPath]: googleBooksApi.reducer,
    user: userReducer,
    accessibility: accessibilityReducer,
    insights: insightsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(libraryApi.middleware),
})

setupListeners(store.dispatch)