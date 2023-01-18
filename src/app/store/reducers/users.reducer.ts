import { filter } from 'rxjs';
import {
    addUser,
    deleteUser,
    updateUser,
    addUserSuccess,
    updateUserSuccess,
    deleteUserSuccess
} from './../actions/user.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess } from '../actions/user.actions';
import { UsersDTO } from '../../interfaces/usersDTO.interface';

export interface UsersState {
    users: UsersDTO[];
}

export const initialUsersState: UsersState = {
    users: []
};

const _usersReducer = createReducer(
    initialUsersState,
    on(loadUsersSuccess, (state, action) => {
        return {
            ...state,
            users: action.users
        };
    }),
    // on(loadUsers, (state, action) => {
    //     return {
    //         ...state,
    //         action
    //     };
    // }),
    on(addUserSuccess, (state, action) => {
        return {
            ...state,
            users: [...state.users, action.user]
        };
    }),
    // on(addUser, (state, action) => {
    //     return {
    //         ...state,
    //         action
    //     };
    // }),
    on(updateUserSuccess, (state, action) => {
        console.log('state is ', state);
        console.log('action is ', action);

        return {
            ...state,
            users: []
        };
    }),
    // on(updateUser, (state, action) => {
    //     return {
    //         ...state,
    //         action
    //     };
    // }),
    on(deleteUserSuccess, (state, action) => {
        return {
            ...state,
            users: state.users.filter(user => user._id !== action.id)
        };
    })
    // on(deleteUser, (state, action) => {
    //     return {
    //         ...state,
    //         id: action.id
    //     };
    // })
);

export function usersReducer(state = initialUsersState, action: Action): UsersState {
    return _usersReducer(state, action);
}
