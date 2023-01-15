import { ActionReducerMap } from '@ngrx/store';
import * as fromUsersData from './reducers/users.reducer';

export interface AppState {
    users: fromUsersData.UsersState;
}

export const appReducers: ActionReducerMap<AppState> = {
    users: fromUsersData.usersReducer
};
