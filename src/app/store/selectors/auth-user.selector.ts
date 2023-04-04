import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuthUserState from '../reducers/auth-user.reducer';

export const getAuthUserData = createFeatureSelector<fromAuthUserState.AuthUserState>('currentUser');

export const getAuthUser = () =>
    createSelector(getAuthUserData, result => {
        return result.authUser;
    });

export const isAdmin = () =>
    createSelector(getAuthUserData, result => {
        return result.authUser?.role === 'Admin' || result.authUser?.role === 'Owner';
    });
