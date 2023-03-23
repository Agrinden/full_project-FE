import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { ConfirmationDialogChoice } from 'src/app/enums/dialog-enums';
import { UsersDTO } from 'src/app/interfaces/usersDTO.interface';
import { UserService } from 'src/app/services/user/user.service';
import { getUsers } from './../../store/selectors/user.selectors';
import { loadUsers, updateUser, addUser, deleteUser } from './../../store/actions/user.actions';
import { AppState } from './../../store/data.state';
import { UserCardComponent } from './../user-card/user-card.component';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],

    standalone: true,
    imports: [CommonModule, FormsModule, UserCardComponent]
})
export class MainPageComponent implements OnInit, OnDestroy {
    public users$: Observable<UsersDTO[]>;
    public surName: string;
    public errorMessage = '';

    private destroy$ = new Subject<void>();

    constructor(private userServise: UserService, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.showUsers();
    }

    public saveUser(): void {
        /*without ngrx-effects*/
        // this.userServise.addUser(this.surName).subscribe({
        //     next: user => {
        //         this.surName = '';
        //         this.store.dispatch(addUserSuccess({ user: user as UsersDTO }));
        //     },
        //     error: err => {
        //         this.errorMessage = err.error.message;
        //         console.log(this.errorMessage);
        //         this.openSnackBar(this.errorMessage);
        //     }
        // });
        this.store.dispatch(addUser({ surName: this.surName }));
        this.surName = '';
    }

    public showUsers(): void {
        /*without ngrx*/
        // this.users$ = this.userServise.getUsers();
        this.users$ = this.store.select(getUsers());
        /*without ngrx-effects*/
        // this.userServise.getUsers().subscribe(result => {
        //     this.store.dispatch(loadUsersSuccess({ users: result }));
        // });
        this.store.dispatch(loadUsers());
    }

    public updateUser(user: UsersDTO): void {
        /*without ngrx*/
        // this.userServise.editUser(user).subscribe(() => {
        //     this.showUsers();
        // });
        /*without ngrx-effects*/
        // this.userServise.editUser(user).subscribe(() => {
        //     this.store.dispatch(updateUserSuccess({ user }));
        // });
        this.store.dispatch(updateUser({ user }));
    }

    public deleteUser(userId: string): void {
        this.userServise
            .showConfirmationDialog('Are you sure that you want to delete user?')
            .pipe(
                filter(value => value === ConfirmationDialogChoice.confirm),
                /*without ngrx*/
                // switchMap(() => this.userServise.deleteUser(userId)),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.store.dispatch(deleteUser({ id: userId })));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
