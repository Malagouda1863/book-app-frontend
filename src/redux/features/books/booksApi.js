import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

// Base query for books API
const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

// Base query for root API
const rootBaseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery, 
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/api/books",
            providesTags: ["Books"]
        }),
        searchBooks: builder.query({
            query: (searchTerm) => `/api/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/api/books/${id}`,
            providesTags: (results, error, id) => [{type: "Books", id}],
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/api/books/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),
        UpdateBook: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/api/books/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/api/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
})

export const {
    useFetchAllBooksQuery, 
    useSearchBooksQuery,
    useFetchBookByIdQuery, 
    useAddBookMutation, 
    useUpdateBookMutation, 
    useDeleteBookMutation
} = booksApi;
export default booksApi;