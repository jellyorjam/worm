import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/books/"}),
  endpoints: (builder) => ({
    getBook: builder.query({
      query: (id) => `getBook/${id}`
    })
  })
})

export const { useGetBookQuery } = libraryApi