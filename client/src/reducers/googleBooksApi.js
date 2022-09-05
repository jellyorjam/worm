import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const googleBooksApi = createApi({
  reducerPath: 'googleBooksApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.googleapis.com/books/v1/"}),
  endpoints: (builder) => ({
    getYearDetail: builder.query({
      query: (book) => `volumes?langRestrict=en&q=${book}`
    }),
    getBookDetail: builder.query({
      query: (selfLink) => `volumes/${selfLink}`
    })
  })
})

export const { useGetYearDetailQuery, useGetBookDetailQuery } = googleBooksApi