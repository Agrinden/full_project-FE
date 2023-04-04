import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { filter, take } from 'rxjs';

import { Store } from '@ngrx/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthData } from 'src/app/interfaces/authData.interface';
import { RouteUrls } from 'src/app/constants/routes';
import { AppState } from './../../../store/data.state';
import { getAuthUser } from './../../../store/selectors/auth-user.selector';
import { loadAuthUser } from 'src/app/store/actions/auth-user.actions';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],

    standalone: true,
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class LoginFormComponent implements OnInit {
    public loginForm: FormGroup;
    public isPassVisible: boolean;

    constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.loginForm = this.getLoginForm();
    }

    public togglePassVisibility(): void {
        this.isPassVisible = !this.isPassVisible;
    }

    public login(): void {
        if (this.loginForm && this.loginForm.valid) {
            const authData = this.loginForm.value as AuthData;
            // this.authDataService.login(authData).subscribe(res => {
            //     localStorage.setItem('userToken', res.jwtToken);
            //     this.router.navigate([RouteUrls.main]);
            // });
            this.store.dispatch(loadAuthUser({ authUser: authData }));
        }
        this.store
            .select(getAuthUser())
            .pipe(
                filter(data => !!data),
                take(1)
            )
            .subscribe(res => {
                this.router.navigate([RouteUrls.main]);
            });
    }

    public registration(): void {
        this.router.navigate([RouteUrls.registration]);
    }

    private getLoginForm(): FormGroup {
        const form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required]
        });
        return form;
    }
}
