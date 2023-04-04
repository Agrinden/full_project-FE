import { Injectable } from '@angular/core';
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

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

    public login(authData: AuthData): Observable<AuthDTO> {
        const body = { ...authData };
        return this.http.post<AuthDTO>(environment.LOGIN_URL, body);
    }

    public logout(userToken: string | null): Observable<string> {
        const body = { userToken };
        return this.http.post<string>(environment.LOGOUT_URL, body);
    }

    public registration(regData: RegistrDataDTO): Observable<RegistrDataDTO> {
        return this.http.post<RegistrDataDTO>(environment.REGISTRATION_URL, regData);
    }

    public deleteAccount(userId: string): Observable<{ _id: string }> {
        return this.http.delete<{ _id: string }>(`${environment.baseUrl}/${userId}`);
    }

    public isAuthenticated(): boolean {
        return !!(this.token && !this.jwtHelper.isTokenExpired(this.token));
    }

    public getAllAuthUsers(): Observable<RegistrDataDTO[]> {
        return this.http.get<RegistrDataDTO[]>(environment.baseUrl.concat('/authUsers'));
    }

    public getAuthUser(id: string): Observable<RegistrDataDTO> {
        const body = { _id: id };
        return this.http.post<RegistrDataDTO>(environment.baseUrl.concat('/authUser'), body);
    }

    public getUserFromJwt() {
        if (this.token) {
            const user: AuthData = jwtDecode(this.token);
            return { ...user };
        }
        return null;
    }
}
