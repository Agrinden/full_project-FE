import { AdminPageComponent } from './../admin-page/admin-page.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { filter, Subject, takeUntil, switchMap, Observable, tap } from 'rxjs';

import { ConfirmationDialogChoice } from './../../enums/dialog-enums';
import { UserService } from 'src/app/services/user/user.service';
import { AuthDataService } from './../../services/user/auth-data.service';
import { defaultMenuTabs } from './../../constants/menu';
import { AuthData } from 'src/app/interfaces/authData.interface';
import { RouteUrls } from './../../constants/routes';
import { AuthDTO } from 'src/app/interfaces/authDTO.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/data.state';
import { getAuthUser } from 'src/app/store/selectors/user.selectors';

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
        ReactiveFormsModule,
        AdminPageComponent
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
    public links = defaultMenuTabs;
    public activeLink = this.links[0];
    public authUser$: Observable<AuthData | null>;

    private destroy$ = new Subject<void>();

    constructor(
        private authDataService: AuthDataService,
        private userService: UserService,
        private router: Router,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.authUser$ = this.store.select(getAuthUser());
    }

    public signOut(): void {
        const userToken = localStorage.getItem('userToken');

        this.userService
            .showConfirmationDialog('Are you sure that you want to Log Out?')
            .pipe(
                filter(value => value === ConfirmationDialogChoice.confirm),
                switchMap(() => this.authDataService.logout(userToken)),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                localStorage.clear();
                this.router.navigate([RouteUrls.login]);
            });
    }

    public deleteAcc(id: string): void {
        this.userService
            .showConfirmationDialog('Are you sure that you want to delete your account?')
            .pipe(
                filter(value => value === ConfirmationDialogChoice.confirm),
                switchMap(() => this.authDataService.deleteAccount(id)),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                localStorage.clear();
                this.router.navigate([RouteUrls.login]);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
