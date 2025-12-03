import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import Cookies from "js-cookie";

// Base fetch query with token header
const baseQuery = fetchBaseQuery({
  baseUrl: "https://reqres.in/api",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// Wrap baseQuery to handle errors
const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const status = result.error.status;
    const message = (result.error.data as { message?: string })?.message;

    switch (status) {
      case 401:
        console.error("Unauthorized", result.error);
        // Optional: redirect to login
        // window.location.href = "/login";
        break;
      case 403:
        toast.error(message || "Forbidden");
        break;
      case 404:
        toast.error(message || "Not Found");
        break;
      case 409:
        toast.error(message || "Conflict");
        break;
      default:
        if (message) toast.error(message);
        break;
    }
  }

  return result;
};

// Create baseApi
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["auth", "user"], // Add more as needed
  endpoints: () => ({}), // Will be injected later
});
