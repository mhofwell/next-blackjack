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
        resetActivePool: (_state, _action: PayloadAction<Pool[]>) => {
            // reset state
            return initialState;
        },
        setActivePool: (state, action: PayloadAction<string>) => {
            // set the active pool

            state.data.active = action.payload;
        },
    },
});

export const { resetActivePool, setActivePool } = pool.actions;
export default pool.reducer;
