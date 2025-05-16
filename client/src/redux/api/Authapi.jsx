import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Authapi = createApi({
  reducerPath: "authApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // 🔹 Auth Endpoints
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginWithEmail: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // 🔹 OTP Endpoints
    sendOtp: builder.mutation({
      query: (mobile) => ({
        url: "/users/send-otp",
        method: "POST",
        body: { mobile },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ mobile, otp }) => ({
        url: "/users/verify-otp",
        method: "POST",
        body: { mobile, otp },
      }),
    }),
    verifyEmailOtp: builder.mutation({
      query: ({ email, email_otp }) => ({
        url: "/users/verify-otp", // ✅ Ensure backend can handle both email & mobile OTP
        method: "POST",
        body: { email, email_otp },
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/users/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    // 🔹 User CRUD Operations
    getUserById: builder.query({
      query: (userId) => `/users/fetch-users-by-id/${userId}`,
           providesTags: ["User"],
    }),
    getUsers: builder.query({
      query: (searchName) => {
        const queryParam = searchName ? `?name=${searchName}` : ""; 
        return `/users/fetch-all-users${queryParam}`;
      },
      transformResponse: (response) => response.users, // 🔥 Extract only the users array
      providesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"], // ✅ Ensure UI updates after adding a user
    }),
    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `/users/update-users-by-id/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"], // ✅ Ensure UI updates after updating a user
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete-users-by-id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"], // ✅ Ensure UI updates after deleting a user
    }),

    // User Address

    getUserAddresses: builder.query({
      query: ({user_id}) => `/address/fetch-address-by-id/${user_id}`,
      providesTags: (result, error, user_id) => [{ type: 'Address', id: user_id }],
    }),

    addUserAddress: builder.mutation({
      query: (data) => ({
        url: "/address/create-address",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], // ✅ Ensure UI updates after adding an address
    }),
    updateUserAddress: builder.mutation({
      query: ({ user_id, selectedAddressId, updatedAddress }) => ({
        url: `/address/update-address/${user_id}/${selectedAddressId}`,
        method: "PUT",
        body: updatedAddress,
      }),
      invalidatesTags: ["User"],
    }),
    
    DeleteUserAddress: builder.mutation({
      query: ({ user_id ,addressId}) => ({
        url: `/address/delete-address`,
        method: "DELETE",
        body:{user_id,addressId}
      }),
      invalidatesTags: ["User"], 
    }), 
  }),
});

export const {
  useRegisterUserMutation,
  useLoginWithEmailMutation,
  useSendOtpMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useVerifyEmailOtpMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetUsersQuery,
  useAddUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation, 
  useGetUserAddressesQuery,
  useAddUserAddressMutation,
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation,
} = Authapi;
