import { ActionReducerMap } from '@ngrx/store';

import * as fromUsersData from './reducers/users.reducer';
import * as fromAuthUserData from './reducers/auth-user.reducer';

export interface AppState {
    users: fromUsersData.UsersState;
    currentUser: fromAuthUserData.AuthUserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    users: fromUsersData.usersReducer,
    currentUser: fromAuthUserData.authUserReducer
};
