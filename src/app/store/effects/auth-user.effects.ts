import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, tap } from 'rxjs';

import { AuthDataService } from '../../services/user/auth-data.service';
import { AuthUserActionTypes } from '../actions/auth-user.actions';
import { Router } from '@angular/router';
import { RouteUrls } from 'src/app/constants/routes';

@Injectable()
export class AuthUserEffects {
    loadAuthUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthUserActionTypes.LOAD_AUTH_USER),
            switchMap(({ authUser }) => this.authDataService.login(authUser)),
            tap(res => localStorage.setItem('userToken', res.jwtToken)),
            map(authUser => ({
                type: AuthUserActionTypes.LOAD_AUTH_USER_SUCCESS,
                authUser
            }))
        )
    );

    logoutAuthUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthUserActionTypes.LOGOUT_AUTH_USER),
            switchMap(({ jwtToken }) => this.authDataService.logout(jwtToken)),
            tap(() => {
                localStorage.clear();
                this.router.navigate([RouteUrls.login]);
            }),
            map(jwtToken => ({
                type: AuthUserActionTypes.LOGOUT_AUTH_USER_SUCCESS,
                jwtToken
            }))
        )
    );

    deleteAuthUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthUserActionTypes.DELETE_AUTH_USER),
            switchMap(({ _id }) => this.authDataService.deleteAccount(_id)),
            tap(() => {
                localStorage.clear();
                this.router.navigate([RouteUrls.login]);
            }),
            map(_id => ({
                type: AuthUserActionTypes.DELETE_AUTH_USER_SUCCESS,
                _id
            }))
        )
    );

    constructor(private actions$: Actions, private authDataService: AuthDataService, private router: Router) {}
}
