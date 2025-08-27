import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Book', 'User', 'Admin'],
  endpoints: (builder) => ({
    // --- Authentication Endpoints ---
        login: builder.mutation({
      query: ({ firebaseToken }) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${firebaseToken}`,
        },
      }),
    }),

    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: '/auth/admin/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    // --- User Profile Endpoints ---
    getProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // --- Book Endpoints ---
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    rateBook: builder.mutation({
      query: ({ id, ...ratingData }) => ({
        url: `/books/${id}/rate`,
        method: 'POST',
        body: ratingData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }],
    }),
    

    // --- Admin Endpoints ---
    uploadBook: builder.mutation({
      query: (formData) => ({
        url: '/admin/books/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Book'],
    }),
     getUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['User'],
    }),
    getDashboardStats: builder.query({
      query: () => '/admin/dashboard',
      providesTags: ['Admin'],
    }),
  }),
});

// Export all hooks for usage in components
export const {
  useLoginMutation,
  useAdminLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useRateBookMutation,
  useUploadBookMutation,
  useGetUsersQuery,
  useGetDashboardStatsQuery,
} = apiSlice;