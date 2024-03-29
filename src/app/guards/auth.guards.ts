import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { RouteUrls } from './../constants/routes';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const jwtToken = localStorage.getItem('userToken');

        if (jwtToken) {
            return true;
        }
        this.router.navigate([RouteUrls.login]);
        return false;
    }
}
