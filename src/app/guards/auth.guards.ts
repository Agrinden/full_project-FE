import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { RouteUrls } from './../constants/routes';
import { Store } from '@ngrx/store';
import { AppState } from '../store/data.state';
import { getAuthUser } from '../store/selectors/auth-user.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store<AppState>) {}

    canActivate(): boolean {
        if (this.checkIfUserAuthenticated()) {
            return true;
        }
        this.router.navigate([RouteUrls.login]);
        return false;
    }

    private checkIfUserAuthenticated() {
        return this.store.select(getAuthUser());
    }
}
