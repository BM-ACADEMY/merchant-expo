// src/redux/api/chatFileApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MessageImagesApi = createApi({
    reducerPath: "messageImagesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_IMAGE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["messageImagesApi"],

    endpoints: (builder) => ({
        // 📤 Upload chat file(s)
        uploadMessageImages: builder.mutation({
            query: (formData) => ({
                url: "/upload-chat-images",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["messageImagesApi"],
        }),

        // 📥 Get chat file (image, video, etc.)
        getMessageImages: builder.query({
            query: ({ senderId, receiverId, file_name }) =>
                `/fetch-all-images/${senderId}/${receiverId}/${file_name}`,
        }),

        // ❌ Delete chat file(s)
        deleteMessageImages: builder.mutation({
            query: (body) => ({
                url: "/delete-images",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["messageImagesApi"],
        }),

        // ♻️ Update/Replace chat file
        updateMessageImages: builder.mutation({
            query: (formData) => ({
                url: "/update-images",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["messageImagesApi"],
        }),
    }),
});

export const {
    useUploadMessageImagesMutation,
    useGetMessageImagesQuery,
    useDeleteMessageImagesMutation,
    useUpdateMessageImagesMutation,
} = MessageImagesApi;
