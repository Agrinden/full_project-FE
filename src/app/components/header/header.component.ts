import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { filter, Subject, takeUntil, switchMap } from 'rxjs';

import { ConfirmationDialogChoice } from './../../enums/dialog-enums';
import { UserService } from 'src/app/services/user/user.service';
import { AuthDataService } from './../../services/user/auth-data.service';
import { defaultMenuTabs } from './../../constants/menu';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],

    standalone: true,
    imports: [
        MatTabsModule,
        MatIconModule,
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatDialogModule,
        MatSlideToggleModule,
        ReactiveFormsModule
    ]
})
export class HeaderComponent implements OnDestroy {
    public links = defaultMenuTabs;
    public activeLink = this.links[0];

    private destroy$ = new Subject<void>();

    constructor(private router: Router, private authDataService: AuthDataService, private userService: UserService) {}

    signOut() {
        const userToken = localStorage.getItem('userToken');

        this.userService
            .showConfirmationDialog('Are you sure that you want to Log Out?')
            .pipe(
                filter(value => value === ConfirmationDialogChoice.confirm),
                switchMap(() => this.authDataService.logout(userToken)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
