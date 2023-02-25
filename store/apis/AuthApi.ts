import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { getBaseUrl } from '../../utils/BaseUrl';

export type RegisterUserPostParams = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  name: string;
  email: string;
  id: string;
  token: string;
};

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserResponse, RegisterUserPostParams>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = AuthApi;
