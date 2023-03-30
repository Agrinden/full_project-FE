import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrDataDTO } from './../../interfaces/registrData.interface';
import { AuthDataService } from './../../services/user/auth-data.service';
import { AuthUsersListComponent } from './../auth-users-list/auth-users-list.component';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss'],

    standalone: true,
    imports: [CommonModule, AuthUsersListComponent]
})
export class AdminPageComponent implements OnInit {
    public authUsers: RegistrDataDTO[] = [];

    constructor(private authDataService: AuthDataService) {}

    ngOnInit(): void {
        this.authDataService.getAllAuthUsers().subscribe(usersData => {
            this.authUsers = usersData.filter(data => data.role !== 'Owner') || [];
        });
    }
}
