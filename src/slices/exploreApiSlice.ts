import { apiSlice } from "./apiSlice";

//The explore url
const apiTarget = process.env.API_TARGET || "http://localhost:5000";
const EXPLORE_URL = `${apiTarget}/api/explore`;

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
