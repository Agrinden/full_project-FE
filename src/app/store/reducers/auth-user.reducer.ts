import { Action, createReducer, on } from '@ngrx/store';

import { deleteAuthUser, loadAuthUsersSuccess, logoutAuthUser } from '../actions/auth-user.actions';
import { AuthData } from 'src/app/interfaces/authData.interface';

export interface AuthUserState {
    authUser: AuthData | null;
}

export const initialAuthUserState: AuthUserState = {
    authUser: null
};

const _authUserReducer = createReducer(
    initialAuthUserState,
    on(loadAuthUsersSuccess, (state, action) => {
        return {
            ...state,
            authUser: action.authUser
        };
    }),

    on(logoutAuthUser, (state, action) => {
        return {
            ...state,
            jwtToken: action.jwtToken
        };
    }),

    on(deleteAuthUser, (state, action) => {
        return {
            ...state,
            _id: action._id
        };
    })
);

export function authUserReducer(state = initialAuthUserState, action: Action): AuthUserState {
    return _authUserReducer(state, action);
}
