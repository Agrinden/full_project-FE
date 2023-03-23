import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUsersState from '../reducers/users.reducer';
import * as fromAuthUserState from '../reducers/users.reducer';

export const getUsersData = createFeatureSelector<fromUsersState.UsersState>('users');
export const getAuthUserData = createFeatureSelector<fromAuthUserState.AuthUserState>('currentUser');

export const getUsers = () =>
    createSelector(getUsersData, result => {
        return result.users;
    });

export const getAuthUser = () =>
    createSelector(getAuthUserData, result => {
        return result.authUser;
    });
