import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    data: AuthState;
};

type AuthState = {
    id: string;
    username: string;
    isAuth: boolean;
    avatar: string;
    team: string;
    email: string;
};

type User = {
    id: string;
    username: string;
    avatar: string;
    team: string;
    email: string;
};

const initialState = {
    data: {
        id: '',
        isAuth: false,
        username: '',
        avatar: '',
        team: '',
        email: '',
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        removeAuthState: () => {
            return initialState;
        },
        setAuthState: (_state, action: PayloadAction<User>) => {
            return {
                data: {
                    id: action.payload.id,
                    isAuth: true,
                    username: action.payload.username,
                    avatar: action.payload.avatar,
                    team: action.payload.team,
                    email: action.payload.email,
                },
            };
        },
    },
});

export const { setAuthState, removeAuthState } = auth.actions;
export default auth.reducer;
