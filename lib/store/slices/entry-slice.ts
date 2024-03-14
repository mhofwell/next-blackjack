import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    data: EntryState;
};

type EntryState = {
    active: string;
};

const initialState = {
    data: {
        active: '',
    } as EntryState,
} as InitialState;

export const entry = createSlice({
    name: 'entry',
    initialState,
    reducers: {
        setActiveEntry: (state, action: PayloadAction<string>) => {
            // set the active entry
            state.data.active = action.payload;
        },
    },
});

export const { setActiveEntry } = entry.actions;
export default entry.reducer;
