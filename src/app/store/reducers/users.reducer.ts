import { addUserSuccess, updateUserSuccess, deleteUserSuccess } from './../actions/user.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { loadUsersSuccess } from '../actions/user.actions';
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
    on(addUserSuccess, (state, action) => {
        return {
            ...state,
            users: [...state.users, action.user]
        };
    }),
    on(updateUserSuccess, (state, action) => {
        console.log('state is ', state);
        console.log('action is ', action);
        console.log(state.users);
        console.log(action.user._id);

        const newUsers = state.users.reduce((acc, item) => {
            if (item._id === action.user._id) {
                return [...acc, action.user];
            }
            return [...acc, item];
        }, []);

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
    // on(loadUsers, (state, action) => {
    //     return {
    //         ...state,
    //         action
    //     };
    // }),

    // on(addUser, (state, action) => {
    //     return {
    //         ...state,
    //         action
    //     };
    // }),

    // on(updateUser, (state, action) => {    //     return {
    //         ...state,
    //         action
    //     };
    // }),

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
