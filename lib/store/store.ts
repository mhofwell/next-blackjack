import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import poolReducer from './slices/pool-slice';
import entryReducer from './slices/entry-slice';

export const store = () => {
    return configureStore({
        reducer: {
            authReducer,
            poolReducer,
            entryReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
