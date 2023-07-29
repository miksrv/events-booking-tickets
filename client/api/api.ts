import {
    APIRequestBooking,
    APIResponseBooking,
    APIResponseError,
    APIResponseEventsList
} from '@/api/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

type Maybe<T> = T | void

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            // const token = (getState() as RootState).auth.userToken
            //
            // if (token) {
            //     headers.set('Authorization', token)
            // }

            return headers
        }
    }),
    endpoints: (builder) => ({
        bookingPost: builder.mutation<
            Maybe<APIResponseBooking> | APIResponseError,
            APIRequestBooking
        >({
            query: ({ ...formState }) => ({
                body: formState,
                method: 'POST',
                url: 'booking'
            }),
            transformErrorResponse: (response) => response.data
        }),

        eventsGetList: builder.query<Maybe<APIResponseEventsList>, void>({
            query: () => 'events',
            transformErrorResponse: (response) => response.data
        })
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    reducerPath: 'api',
    tagTypes: []
})

// Export hooks for usage in functional components
export const {
    useBookingPostMutation,

    useEventsGetListQuery,

    util: { getRunningQueriesThunk }
} = api

// export endpoints for use in SSR
export const { eventsGetList } = api.endpoints
