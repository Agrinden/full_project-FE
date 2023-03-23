import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';

import { environment } from './../../../environments/environment';
import { AuthDTO } from 'src/app/interfaces/authDTO.interface';
import { AuthData } from './../../interfaces/authData.interface';
import { RegistrDataDTO } from './../../interfaces/registrData.interface';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
    public token = localStorage.getItem('userToken');

    constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

    public login(authData: AuthData): Observable<AuthDTO> {
        const body = { ...authData };
        return this.http.post<AuthDTO>(environment.LOGIN_URL, body);
    }

    public logout(userToken: string | null): Observable<string> {
        const body = { userToken };
        return this.http.post<string>(environment.LOGOUT_URL, body);
    }

    public registration(regData: RegistrDataDTO): Observable<Response> {
        return this.http.post<Response>(environment.REGISTRATION_URL, regData);
    }

    public deleteAccount(userId: string): Observable<{ _id: string }> {
        console.log(userId);

        return this.http.delete<{ _id: string }>(`${environment.baseUrl}/${userId}`);
    }

    public isAuthenticated(): boolean {
        return !!(this.token && !this.jwtHelper.isTokenExpired(this.token));
    }

    public getUserFromJwt() {
        if (this.token) {
            const user: AuthData = jwtDecode(this.token);
            return { ...user };
        }
        return null;
    }
}
