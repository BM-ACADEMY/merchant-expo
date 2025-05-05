import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MessageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL, 
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    // Send a new message
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: '/chat/send-message',
        method: 'POST',
        body: messageData,
      }),
      invalidatesTags: ['Messages'],
    }),

    // Get all messages between two users
    getMessages: builder.query({
      query: ({ userId, chatPartnerId }) => `/chat/recieve-message/${userId}/${chatPartnerId}`,
      providesTags: ['Messages'],
    }),

    // Mark message as read
    markAsRead: builder.mutation({
      query: ({userId,selectedUserId}) => ({
        url: `/chat/mark-as-read`,
        method: 'PATCH',
        body:{userId,selectedUserId}
      }),
      invalidatesTags: ['Messages'],
    }),

    // Update a message
    updateMessage: builder.mutation({
      query: ({ messageId, updatedData }) => ({
        url: `/chat/update-message/${messageId}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Messages'],
    }),

    // Delete a message
    deleteMessage: builder.mutation({
      query: ({messageId}) => ({
        url: `/chat/delete-message/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
    getAllUsers: builder.query({
        query: ({ page = 1, limit = 10 }) => `/users/fetch-all-users?page=${page}&limit=${limit}`,
        providesTags: ['Messages'],
      }),
      getLastMessageBetweenUsers: builder.query({
        query: ({ userId, contactId }) => `/chat/last-message?userId=${userId}&contactId=${contactId}`,
      }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useGetAllUsersQuery,
  useGetLastMessageBetweenUsersQuery,
  useMarkAsReadMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = MessageApi;
