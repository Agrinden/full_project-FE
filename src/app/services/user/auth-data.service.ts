import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/interfaces/authData.interface';
import { AuthDTO } from 'src/app/interfaces/authDTO.interface';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
    constructor(private http: HttpClient) {}

    public login(authData: AuthData): Observable<AuthDTO> {
        return this.http.post<AuthDTO>(environment.LOGIN_URL, authData);
    }
}
