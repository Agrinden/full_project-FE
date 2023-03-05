import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { environment } from './../../../environments/environment';
import { UsersDTO } from 'src/app/interfaces/usersDTO.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user: UsersDTO[] = [];
    public error: any;

    private readonly BASE_URL = environment.baseUrl;

    constructor(private http: HttpClient, private dialog: MatDialog) {}

    public getUsers(): Observable<UsersDTO[]> {
        return this.http.get<UsersDTO[]>(this.BASE_URL.concat('/users'));
    }

    public addUser(userData: string): Observable<UsersDTO> {
        const body = { surName: userData };
        return this.http.post<UsersDTO>(`${environment.baseUrl}/users`, body);
    }

    public editUser(userData: UsersDTO): Observable<UsersDTO[]> {
        const body = { ...userData };
        return this.http.put<UsersDTO[]>(`${environment.baseUrl}/users`, body);
    }

    public deleteUser(userID: string): Observable<{ _id: string }> {
        return this.http.delete<{ _id: string }>(`${environment.baseUrl}/users/${userID}`);
    }

    public showConfirmationDialog(message: string): Observable<any> {
        return this.dialog
            .open(DialogComponent, {
                disableClose: true,
                autoFocus: false,
                data: message
            })
            .afterClosed();
    }
}
