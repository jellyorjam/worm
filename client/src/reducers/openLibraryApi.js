import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const openLibraryApi = createApi({
  reducerPath: 'openLibraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org/"}),
  endpoints: (builder) => ({
    getYear: builder.query({
      query: (year) => `search.json?limit=20&q=subject:fiction+AND+language:eng+AND+first_publish_year:${year}`
    }),
    getPlace: builder.query({
      query: (place) => `search.json?subject=fiction&language=eng&limit=20&place=${place}`
    })
  })
})

export const { useGetYearQuery, useGetPlaceQuery } = openLibraryApi