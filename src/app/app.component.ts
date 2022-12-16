import { Observable } from 'rxjs';
import { UserService } from './services/user/user.service';
import { Component } from '@angular/core';
import { UsersDTO } from './interfaces/usersDTO.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public users$!: Observable<UsersDTO[]>;

    constructor(private userServise: UserService) {}

    public showUsers() {
        this.users$ = this.userServise.getUsers();
    }
}
