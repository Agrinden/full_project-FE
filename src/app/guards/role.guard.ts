import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../store/data.state';
import { isAdmin } from '../store/selectors/auth-user.selector';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private store: Store<AppState>) {}

    canActivate(): Observable<boolean> {
        return this.checkIfAuthenticatedUser();
    }

    private checkIfAuthenticatedUser() {
        return this.store.select(isAdmin());
    }
}
