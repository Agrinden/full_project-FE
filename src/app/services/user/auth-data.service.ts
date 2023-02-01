import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../../environments/environment';
import { AuthData } from 'src/app/interfaces/authData.interface';
import { AuthDTO } from 'src/app/interfaces/authDTO.interface';
import { RouteUrls } from 'src/app/constants/routes';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
    constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

    public login(authData: AuthData): Observable<AuthDTO> {
        return this.http.post<AuthDTO>(environment.LOGIN_URL, authData);
    }

    public logout(userToken: string | null): Observable<string> {
        const body = { userToken };
        localStorage.clear();
        this.router.navigate([RouteUrls.login]);
        return this.http.post<string>(environment.LOGOUT_URL, body);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('userToken');
        return !!(token && !this.jwtHelper.isTokenExpired(token));
    }
}
