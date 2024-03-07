import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    data: PlayerState;
};

type PlayerState = {
    active: string;
};

type Player = {
    id: string;
};

const initialState = {
    data: {
        active: '',
    } as PlayerState,
} as InitialState;

export const player = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addPlayers: (state, action: PayloadAction<Player[]>) => {
            // save the pools to the store
        },
        setActivePlayer: (state, action: PayloadAction<string>) => {
            // set the active pool
            state.data.active = action.payload;
        },
    },
});

export const { setActivePlayer } = player.actions;
export default player.reducer;
