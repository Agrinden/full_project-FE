import { ActionReducerMap } from '@ngrx/store';

import * as fromUsersData from './reducers/users.reducer';

export interface AppState {
    users: fromUsersData.UsersState;
    currentUser: fromUsersData.AuthUserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    users: fromUsersData.usersReducer,
    currentUser: fromUsersData.authUserReducer
};
