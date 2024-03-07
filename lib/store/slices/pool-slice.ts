import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    data: PoolState;
};

type PoolState = {
    active: string;
};

type Pool = {
    id: string;
};

const initialState = {
    data: {
        active: '',
    } as PoolState,
} as InitialState;

export const pool = createSlice({
    name: 'pool',
    initialState,
    reducers: {
        addPools: (state, action: PayloadAction<Pool[]>) => {
            // save the pools to the store
            state.data.active = action.payload[0].id;
        },
        setActivePool: (state, action: PayloadAction<string>) => {
            // set the active pool
            state.data.active = action.payload;
        },
    },
});

export const { addPools, setActivePool } = pool.actions;
export default pool.reducer;
