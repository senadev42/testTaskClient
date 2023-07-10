import { apiSlice } from "./apiSlice";

//The user auth url
const remoteURL =
  process.env.VITE_ENV == "development"
    ? "https://testtask-server.onrender.com"
    : "";

const USERS_URL = `${remoteURL}/api/users`;

export const userApiSlice: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUserMutation,
} = userApiSlice;
