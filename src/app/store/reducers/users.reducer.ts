import { Action, createReducer, on } from '@ngrx/store';

import { AuthData } from './../../interfaces/authData.interface';

import {
    addUserSuccess,
    updateUserSuccess,
    deleteUserSuccess,
    loadUsersSuccess,
    loadAuthUsersSuccess
} from './../actions/user.actions';
import { UsersDTO } from '../../interfaces/usersDTO.interface';

export interface UsersState {
    users: UsersDTO[];
}

export const initialUsersState: UsersState = {
    users: []
};

export interface AuthUserState {
    authUser: AuthData | null;
}

export const initialAuthUserState: AuthUserState = {
    authUser: null
};

const _usersReducer = createReducer(
    initialUsersState,
    on(loadUsersSuccess, (state, action) => {
        return {
            ...state,
            users: action.users
        };
    }),
    on(addUserSuccess, (state, action) => {
        return {
            ...state,
            users: [...state.users, action.user]
        };
    }),
    on(updateUserSuccess, (state, action) => {
        const newUsers = state.users.reduce((acc, item) => {
            if (item._id === action.user._id) {
                return [...acc, action.user];
            }
            return [...acc, item];
        }, [] as UsersDTO[]);

        return {
            ...state,
            users: newUsers
        };
    }),
    on(deleteUserSuccess, (state, action) => {
        return {
            ...state,
            users: state.users.filter(user => user._id !== action.id)
        };
    })
);

const _authUserReducer = createReducer(
    initialAuthUserState,
    on(loadAuthUsersSuccess, (state, action) => {
        return {
            ...state,
            authUser: action.authUser
        };
    })
);

export function usersReducer(state = initialUsersState, action: Action): UsersState {
    return _usersReducer(state, action);
}

export function authUserReducer(state = initialAuthUserState, action: Action): AuthUserState {
    return _authUserReducer(state, action);
}
