import { createAction, props } from '@ngrx/store';

import { AuthData } from './../../interfaces/authData.interface';

export enum AuthUserActionTypes {
    LOAD_AUTH_USER = '[Auth User State] Load Auth User',
    LOAD_AUTH_USER_SUCCESS = '[Auth User State] Load Auth User Success',
    LOGOUT_AUTH_USER = '[Auth User State] logout',
    LOGOUT_AUTH_USER_SUCCESS = '[Auth User State] Logout Success',
    DELETE_AUTH_USER = '[Auth User State] Delete Auth User',
    DELETE_AUTH_USER_SUCCESS = '[Auth User State] Delete Auth User Success'
}

export const loadAuthUser = createAction(AuthUserActionTypes.LOAD_AUTH_USER, props<{ authUser: AuthData }>());
export const loadAuthUsersSuccess = createAction(
    AuthUserActionTypes.LOAD_AUTH_USER_SUCCESS,
    props<{ authUser: AuthData }>()
);

export const logoutAuthUser = createAction(AuthUserActionTypes.LOGOUT_AUTH_USER, props<{ jwtToken: string }>());
export const logoutAuthUserSuccess = createAction(
    AuthUserActionTypes.LOGOUT_AUTH_USER_SUCCESS,
    props<{ jwtToken: string }>()
);

export const deleteAuthUser = createAction(AuthUserActionTypes.DELETE_AUTH_USER, props<{ _id: string }>());
export const deleteAuthUserSuccess = createAction(
    AuthUserActionTypes.DELETE_AUTH_USER_SUCCESS,
    props<{ _id: string }>()
);
