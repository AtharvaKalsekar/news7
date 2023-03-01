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
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthApi;
