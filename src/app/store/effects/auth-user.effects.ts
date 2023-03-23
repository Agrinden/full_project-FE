import { Injectable } from '@angular/core';

import { map, switchMap, tap } from 'rxjs';

import { AuthDataService } from '../../services/user/auth-data.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthUserActionTypes } from '../actions/user.actions';

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

    constructor(private actions$: Actions, private authDataService: AuthDataService) {}
}
