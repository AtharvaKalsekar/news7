import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { getBaseUrl } from '../../utils/BaseUrl';

export type RegisterUserPostParams = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserPostParams = Omit<RegisterUserPostParams, "name">;

export type AuthUserResponse = {
  name: string;
  email: string;
  id: string;
  token: string;
  isEmailVerified: boolean;
};

export type VerifyOtpPostParams = {
  otp: string;
  token: string;
};

export type ResendOtpPostParams = {
  token: string;
};

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthUserResponse, RegisterUserPostParams>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<AuthUserResponse, LoginUserPostParams>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: builder.mutation<any, VerifyOtpPostParams>({
      query: (credentials) => ({
        url: "/verifyOtp",
        method: "POST",
        body: credentials,
        headers: {
          authorization: credentials.token,
        },
      }),
    }),
    resendOtp: builder.mutation<any, ResendOtpPostParams>({
      query: (credentials) => ({
        url: "/resendOtp",
        method: "POST",
        body: credentials,
        headers: {
          authorization: credentials.token,
        },
      }),
    }),
    checkEmailExists: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: "/checkEmailExists",
        method: "POST",
        body: data,
      }),
    }),
    setNewPassword: builder.mutation<any, { token: string; password: string }>({
      query: ({ token, password }) => ({
        url: "/setNewPassword",
        method: "POST",
        body: {
          password,
        },
        headers: {
          authorization: token,
        },
      }),
    }),
    deleteAccount: builder.mutation<any, { token: string }>({
      query: ({ token }) => ({
        url: "/deleteAccount",
        method: "DELETE",
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useCheckEmailExistsMutation,
  useSetNewPasswordMutation,
  useDeleteAccountMutation,
} = AuthApi;
