
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/books/"}),
  keepUnusedDataFor: 2000000,
  endpoints: (builder) => ({
    getBook: builder.query({
      query: (id) => `getBook/${id}`
    })
  })
})

export const { useGetBookQuery } = libraryApi