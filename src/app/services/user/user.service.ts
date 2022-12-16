import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersDTO } from 'src/app/interfaces/usersDTO.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly BASE_URL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    public getUsers(): Observable<UsersDTO[]> {
        return this.http.get<UsersDTO[]>(this.BASE_URL.concat('users'));
    }
}
