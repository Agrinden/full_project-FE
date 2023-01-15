import { getUsers } from './../../store/selectors/user.selectors';
import { loadUsersSuccess } from './../../store/actions/user.actions';
import { AppState } from './../../store/data.state';
import { UserCardComponent } from './../user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { ConfirmationDialogChoice } from 'src/app/enums/dialog-enums';
import { UsersDTO } from 'src/app/interfaces/usersDTO.interface';
import { UserService } from 'src/app/services/user/user.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],

    standalone: true,
    imports: [CommonModule, FormsModule, UserCardComponent]
})
export class HomeLayoutComponent implements OnInit {
    public users$: Observable<UsersDTO[]>;
    public surName: string;
    public errorMessage = '';

    /*snackBar variables*/
    public durationInSeconds = 5000;
    public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    public verticalPosition: MatSnackBarVerticalPosition = 'top';

    private destroy$ = new Subject<void>();

    constructor(private userServise: UserService, private snackBar: MatSnackBar, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.showUsers();
    }

    public openSnackBar(message: string): void {
        this.snackBar.openFromComponent(SnackBarComponent, {
            duration: this.durationInSeconds,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: message
        });
    }

    public saveUser(): void {
        this.userServise.addUser(this.surName).subscribe({
            next: () => {
                this.surName = '';
                this.showUsers();
            },
            error: err => {
                this.errorMessage = err.error.message;
                console.log(this.errorMessage);
                this.openSnackBar(this.errorMessage);
            }
        });
    }

    public showUsers(): void {
        // this.users$ = this.userServise.getUsers();
        this.users$ = this.store.select(getUsers());
        this.userServise.getUsers().subscribe(result => {
            this.store.dispatch(loadUsersSuccess({ users: result }));
        });
    }

    public updateUser(user: UsersDTO): void {
        this.userServise.editUser(user).subscribe(() => {
            this.showUsers();
        });
    }

    public deleteUser(userId: string): void {
        this.userServise
            .deleteWarning()
            .pipe(
                filter(value => value === ConfirmationDialogChoice.confirm),
                switchMap(() => this.userServise.deleteUser(userId)),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.showUsers());
    }
}
