
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../config/keys"

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: url + "/books/"}),
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
    updateBook: builder.mutation({
      query: ({id, ...editedBook}) => ({
        url: id,
        method: "PUT",
        body: editedBook
      }),
      transformResponse: (response, meta, arg) => response.data,
      invalidatesTags: ['Books'],
      
    }),
    deleteBook: builder.mutation({
      query: ({id, payload}) => ({
        url: id,
        method: "DELETE",
        body: payload
      }),
      invalidatesTags: ["Books"]
    }),
    addBook: builder.mutation({
      query: ({...payload}) => ({
        url: "addBook",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Books"]
    })
  })
})

export const { useGetBookQuery, useGetWishlistQuery, useUpdateBookMutation, useDeleteBookMutation, useAddBookMutation } = libraryApi