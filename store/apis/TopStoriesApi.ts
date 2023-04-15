import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "../../utils/BaseUrl";

const API_KEY = "edTOGyAP76XdAxaKwbnD9IqL8mpxbAXn";

export const TopStoriesApi = createApi({
  reducerPath: "TopStoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.nytimes.com/svc/topstories/v2/",
  }),
  tagTypes: ["TopStories"],
  endpoints: (builder) => ({
    getTopStories: builder.query({
      query: (section) => ({
        url: `${section}.json?api-key=${API_KEY}`,
      }),
      providesTags: (result, error, id) => [
        { type: "TopStories", id: result?.section },
      ],
    }),
  }),
});

export const TopStoriesApi2 = createApi({
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

export const { useGetTopStoriesQuery } = TopStoriesApi2;
