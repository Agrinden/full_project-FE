import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { RouteUrls } from './../constants/routes';
import { Store } from '@ngrx/store';
import { AppState } from '../store/data.state';
import { AuthDataService } from '../services/user/auth-data.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store<AppState>, private authData: AuthDataService) {}

    canActivate(): boolean {
        const userId = this.authData.getUserFromJwt();

        if (userId?._id && userId._id !== undefined) {
            return true;
        }
        this.router.navigate([RouteUrls.login]);
        return false;
    }
}
