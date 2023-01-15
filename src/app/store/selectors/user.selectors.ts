import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsersState from '../reducers/users.reducer';

export const getUsersData = createFeatureSelector<fromUsersState.UsersState>('users');

export const getUsers = () =>
    createSelector(getUsersData, result => {
        return result.users;
    });
