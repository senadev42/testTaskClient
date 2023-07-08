import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';

const store: EnhancedStore = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;