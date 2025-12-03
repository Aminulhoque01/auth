// redux/features/login/login.ts

import { baseApi } from "../api/baseApi";

 

const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        headers: {
          // Remove Authorization for login
          Authorization: "",
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
