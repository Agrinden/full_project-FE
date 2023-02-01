import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { RouteUrls } from './../constants/routes';
import { AuthDataService } from './../services/user/auth-data.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authDataService: AuthDataService) {}

    canActivate(): boolean {
        const token = localStorage.getItem('userToken');
        const isLoggedIn = this.authDataService.isAuthenticated();
        if (token && isLoggedIn) {
            return true;
        }
        this.router.navigate([RouteUrls.login]);
        return false;
    }
}
