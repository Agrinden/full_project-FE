import { createAction, props } from '@ngrx/store';

import { UsersDTO } from './../../interfaces/usersDTO.interface';
import { AuthData } from './../../interfaces/authData.interface';

export enum UserActionTypes {
    LOAD_USERS = '[User State] Load Users',
    LOAD_USERS_SUCCESS = '[User State] Load Users Success',
    ADD_USER = '[User State] Add User',
    ADD_USER_SUCCESS = '[User State] Add User Success',
    DELETE_USER = '[User State] Delete User',
    DELETE_USER_SUCCESS = '[User State] Delete User Success',
    UPDATE_USER = '[User State] Update User',
    UPDATE_USER_SUCCESS = '[User State] Update User Success'
}

export enum AuthUserActionTypes {
    LOAD_AUTH_USER = '[Auth User State] Load Auth User',
    LOAD_AUTH_USER_SUCCESS = '[Auth User State] Load Auth User Success'
}

export const loadUsers = createAction(UserActionTypes.LOAD_USERS);
export const loadUsersSuccess = createAction(UserActionTypes.LOAD_USERS_SUCCESS, props<{ users: UsersDTO[] }>());
export const addUser = createAction(UserActionTypes.ADD_USER, props<{ surName: string }>());
export const addUserSuccess = createAction(UserActionTypes.ADD_USER_SUCCESS, props<{ user: UsersDTO }>());
export const deleteUser = createAction(UserActionTypes.DELETE_USER, props<{ id: string }>());
export const deleteUserSuccess = createAction(UserActionTypes.DELETE_USER_SUCCESS, props<{ id: string }>());
export const updateUser = createAction(UserActionTypes.UPDATE_USER, props<{ user: UsersDTO }>());
export const updateUserSuccess = createAction(UserActionTypes.UPDATE_USER_SUCCESS, props<{ user: UsersDTO }>());

export const loadAuthUser = createAction(AuthUserActionTypes.LOAD_AUTH_USER, props<{ authUser: AuthData }>());
export const loadAuthUsersSuccess = createAction(
    AuthUserActionTypes.LOAD_AUTH_USER_SUCCESS,
    props<{ authUser: AuthData }>()
);
