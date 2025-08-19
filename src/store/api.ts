// store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Store {
    id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
}

export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-url.com' }), // Replace with your backend URL
    endpoints: (builder) => ({
        getStores: builder.query<Store[], void>({
            query: () => '/stores', // The endpoint for fetching stores
        }),
    }),
});

export const { useGetStoresQuery } = storeApi;
