import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { RegistrDataDTO } from './../../interfaces/registrData.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthUserRoleService {
    constructor(private http: HttpClient) {}

    public changeAuthUserRole(userRole: string, id: string): Observable<RegistrDataDTO> {
        const body = { role: userRole, _id: id };
        return this.http.put<RegistrDataDTO>(environment.CHANGE_USER_ROLE_URL, body);
    }
}
