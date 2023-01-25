import { ConfirmationDialogChoice } from './../../enums/dialog-enums';
import { UsersDTO } from './../../interfaces/usersDTO.interface';
import { UserService } from './../../services/user/user.service';
import { map, switchMap, filter } from 'rxjs';
import { UserActionTypes } from './../actions/user.actions';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers } from '../actions/user.actions';

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

    deleteUser$ = createEffect(() => {
        console.log('delete user');

        return this.actions$.pipe(
            ofType(UserActionTypes.DELETE_USER),
            // @ts-ignore
            switchMap((data: any) => {
                console.log('swict', data);
                this.userService.deleteUser(data.id);
            }),
            map(({ id }) => ({
                // this.userService.deleteWarning().pipe(filter(val => val === ConfirmationDialogChoice.confirm))
                type: UserActionTypes.DELETE_USER_SUCCESS,
                id
            }))
        );
    });

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
