import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    isAuth: boolean;
    username: string;
    cuid: string;
};

type InitialState = {
    value: AuthState;
};

const initialState: InitialState = {
    value: {
        isAuth: false,
        username: '',
        cuid: '',
    } as AuthState,
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        login: (_state, action: PayloadAction<string>) => {
            // login user, call graphql ?
            return {
                value: {
                    isAuth: true,
                    username: action.payload,
                    cuid: '',
                },
            };
        },
    },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
