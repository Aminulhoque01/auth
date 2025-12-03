import { baseApi } from "../api/baseApi";

 

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<any, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
