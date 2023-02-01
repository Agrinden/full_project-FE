import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserService } from './../../services/user/user.service';
import { UserActionTypes } from './../actions/user.actions';

@Injectable()
export class UserEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActionTypes.LOAD_USERS),
            switchMap(() => this.userService.getUsers()),
            map(users => ({
                type: UserActionTypes.LOAD_USERS_SUCCESS,
                users
            }))
        )
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActionTypes.ADD_USER),
            switchMap(({ surName }) => this.userService.addUser(surName)),
            map(user => ({
                type: UserActionTypes.ADD_USER_SUCCESS,
                user
            }))
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActionTypes.DELETE_USER),
            switchMap(({ id }) => this.userService.deleteUser(id)),
            map(({ _id }) => ({
                type: UserActionTypes.DELETE_USER_SUCCESS,
                id: _id
            }))
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActionTypes.UPDATE_USER),
            switchMap(({ user }) => this.userService.editUser(user)),
            map(user => ({
                type: UserActionTypes.UPDATE_USER_SUCCESS,
                user
            }))
        )
    );

    constructor(private actions$: Actions, private userService: UserService) {}
}
