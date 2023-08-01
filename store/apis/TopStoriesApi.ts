import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getBaseUrl } from '../../utils/BaseUrl';

export const TopStoriesApi = createApi({
  reducerPath: "TopStoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/articles/`,
  }),
  tagTypes: ["TopStories"],
  endpoints: (builder) => ({
    getTopStories: builder.query({
      query: ({ section, token }) => ({
        url: `?section=${section}&articlesPerSection=7`,
        headers: {
          authorization: token,
        },
      }),
      providesTags: (result, error, id) => [
        { type: "TopStories", id: result?.section },
      ],
    }),
  }),
});

export const { useGetTopStoriesQuery } = TopStoriesApi;
