import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostByRequirementApi = createApi({
  reducerPath: "postByRequirementApi",
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
  tagTypes: ["PostByRequirement"],
  endpoints: (builder) => ({
    getPostByRequirements: builder.query({
      query: () => "/post-by-requirement/fetch-all-post-requirement",
      providesTags: ["PostByRequirement"],
    }),
    createPostByRequirement: builder.mutation({
      query: (data) => ({
        url: "/post-by-requirement/create-post-by-requirement",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PostByRequirement"],
    }),
    updatePostByRequirement: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/post-by-requirement/update-post-requirement/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["PostByRequirement"],
    }),
    deletePostByRequirement: builder.mutation({
      query: (id) => ({
        url: `/post-by-requirement/delete-post-requirement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PostByRequirement"],
    }),


    getMerchantAddress: builder.query({
        query: () => "/address/fetch-all-address-for-post-by-requirement",
        providesTags: ["PostByRequirement"],
      }),
  }),
});

export const {
  useGetPostByRequirementsQuery,
  useGetMerchantAddressQuery,
  useCreatePostByRequirementMutation,
  useUpdatePostByRequirementMutation,
  useDeletePostByRequirementMutation,
} = PostByRequirementApi;
