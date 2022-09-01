import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const openLibraryApi = createApi({
  reducerPath: 'openLibraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org/"}),
  endpoints: (builder) => ({
    getYear: builder.query({
      query: (year) => `search.json?limit=9&q=subject:fiction+AND+language:eng+AND+first_publish_year:${year}`
    })
  })
})

export const { useGetYearQuery } = openLibraryApi