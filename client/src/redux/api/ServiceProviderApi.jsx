import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ServiceProviderApi = createApi({
  reducerPath: "serviceProviderApi",
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
  tagTypes: ["ServiceProvider"],
  endpoints: (builder) => ({
    getServiceProviders: builder.query({
      query: () => "/service-providers/fetch-all-service-providers",
      transformResponse: (response) => response.data,
      providesTags: ["ServiceProvider"],
    }),
    getServiceProviderById: builder.query({
      query: (userId) => ({
        url: `/service-providers/fetch-by-id-service-providers/${userId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, userId) => [{ type: "ServiceProvider", id: userId }],
    }),
    addServiceProvider: builder.mutation({
      query: (newProvider) => ({
        url: "/service-providers/create-service-providers",
        method: "POST",
        body: newProvider,
      }),
      invalidatesTags: ["ServiceProvider"],
    }),
    updateServiceProvider: builder.mutation({
      query: ({ userId, updatedProvider }) => ({
        url: `/service-providers/update-service-providers/${userId}`,
        method: "PUT",
        body: updatedProvider,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "ServiceProvider", id: userId },
        "ServiceProvider",
      ],
    }),
    deleteServiceProvider: builder.mutation({
      query: (userId) => ({
        url: `/service-providers/delete-service-providers/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceProvider"],
    }),
  }),
});

export const {
  useGetServiceProvidersQuery,
  useGetServiceProviderByIdQuery,
  useAddServiceProviderMutation,
  useUpdateServiceProviderMutation,
  useDeleteServiceProviderMutation,
} = ServiceProviderApi;