import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const { useGetTopStoriesQuery } = TopStoriesApi;
