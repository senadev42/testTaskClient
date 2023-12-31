import { apiSlice } from "./apiSlice";

const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

//The user auth url
const remoteURL = !isDevelopment ? "https://testtask-server.onrender.com" : "";

const EXPLORE_URL = `${remoteURL}/api/explore`;

export const exploreApiSlice: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    nearbyCities: builder.mutation({
      query: (data) => ({
        url: `${EXPLORE_URL}/nearby-cities`,
        method: "POST",
        body: data,
      }),
    }),
    countryData: builder.mutation({
      query: (data) => ({
        url: `${EXPLORE_URL}/country-data`,
        method: "POST",
        body: data,
      }),
    }),
    countryHistory: builder.mutation({
      query: (data) => ({
        url: `${EXPLORE_URL}/countryHistory`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useNearbyCitiesMutation,
  useCountryDataMutation,
  useCountryHistoryMutation,
} = exploreApiSlice;
