
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/books/"}),
  keepUnusedDataFor: 2000000,
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBook: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const books = _arg;
        const results = await Promise.all(books.map((id) =>  fetchWithBQ(id)));
        
        const merged = [].concat(...results.map(result => result.data));
        return {
          data: merged
        }
      },
      providesTags: ['Books']
    }),
    getWishlist: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const books = _arg;
        const results = await Promise.all(books.map((id) =>  fetchWithBQ(id)));
        
        const merged = [].concat(...results.map(result => result.data));
        return {
          data: merged
        }
      }
    }),
    // getBook: builder.query({
    //   query: (id) => id,
    //   providesTags: ['Books']
    // }),
    updateBook: builder.mutation({
      query: ({id, ...editedBook}) => ({
        url: id,
        method: "PUT",
        body: editedBook
      }),
      transformResponse: (response, meta, arg) => response.data,
      invalidatesTags: ['Books'],
      
    })
  })
})

export const { useGetBookQuery, useGetWishlistQuery, useUpdateBookMutation } = libraryApi