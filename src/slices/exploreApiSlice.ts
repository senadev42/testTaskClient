import { apiSlice } from './apiSlice';


//The explore url
const EXPLORE_URL = '/api/explore';


export const exploreApiSlice: any = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        nearbyCities: builder.mutation({
            query: (data) => ({
                url: `${EXPLORE_URL}/nearby-cities`,
                method: 'POST',
                body: data,
            }),
        })
    }),
});
export const { nearbyCitiesMutation } = exploreApiSlice;