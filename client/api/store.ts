import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { api } from './api'

export const store = () =>
    configureStore({
        middleware: (gDM) => gDM().concat(api.middleware),
        reducer: {
            [api.reducerPath]: api.reducer
        }
    })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(store, { debug: false })
