import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../config/host'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: 'products?limit=100'
      }),
    }),
  })
})
export const {
  useGetAllProductsQuery
} = productsApi
