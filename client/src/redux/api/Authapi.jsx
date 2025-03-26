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
  endpoints: (builder) => ({
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
        url: "/users/verify-otp",
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
    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/fetch-users-by-id/${userId}`,
        method: "GET",
      }),
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
  useLazyGetUserByIdQuery
} = Authapi;
