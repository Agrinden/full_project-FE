import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { filter, Subject, takeUntil, Observable } from 'rxjs';

import { ConfirmationDialogChoice } from './../../enums/dialog-enums';
import { UserService } from 'src/app/services/user/user.service';
import { AuthDataService } from './../../services/user/auth-data.service';
import { defaultMenuTabs } from './../../constants/menu';
import { AuthData } from 'src/app/interfaces/authData.interface';
import { RouteUrls } from './../../constants/routes';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/data.state';
import { getAuthUser, isAdmin } from 'src/app/store/selectors/auth-user.selector';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { deleteAuthUser, logoutAuthUser } from 'src/app/store/actions/auth-user.actions';

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
        AdminPanelComponent
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
    public links = defaultMenuTabs;
    public authUser$: Observable<AuthData | null>;
    public isAdmin$: Observable<boolean>;

    private destroy$ = new Subject<void>();

    constructor(private userService: UserService, private router: Router, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.authUser$ = this.store.select(getAuthUser());
        this.isAdmin$ = this.store.select(isAdmin());
    }

    public signOut(): void {
        const userToken = localStorage.getItem('userToken');

        this.userService
            .showConfirmationDialog('Are you sure that you want to Log Out?')
            .pipe(
                filter(value => value === ConfirmationDialogChoice.confirm),
                /*without ngrx*/
                // switchMap(() => this.authDataService.logout(userToken)),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.store.dispatch(logoutAuthUser({ jwtToken: userToken! }));
                localStorage.clear();
                this.router.navigate([RouteUrls.login]);
            });
    }

    public deleteAcc(id: string): void {
        this.userService
            .showConfirmationDialog('Are you sure that you want to delete your account?')
            .pipe(
                filter(value => value === ConfirmationDialogChoice.confirm),
                /*without ngrx*/
                // switchMap(() => this.authDataService.deleteAccount(id)),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.store.dispatch(deleteAuthUser({ _id: id }));
                localStorage.clear();
                this.router.navigate([RouteUrls.login]);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
