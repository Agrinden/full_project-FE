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
    })
);

export function usersReducer(state = initialUsersState, action: Action): UsersState {
    return _usersReducer(state, action);
}
