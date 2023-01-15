import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthDataService } from '../../../services/user/auth-data.service';
import { AuthData } from 'src/app/interfaces/authData.interface';
import { RouteUrls } from 'src/app/constants/routes';

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

    constructor(private formBuilder: FormBuilder, private router: Router, private authDataService: AuthDataService) {}

    ngOnInit(): void {
        this.loginForm = this.getLoginForm();
    }

    public togglePassVisibility(): void {
        this.isPassVisible = !this.isPassVisible;
    }

    public login(): void {
        if (this.loginForm && this.loginForm.valid) {
            const authData = this.loginForm.value as AuthData;
            this.authDataService.login(authData).subscribe(res => {
                // localStorage.setItem('userToken', res.jwtToken);
                this.router.navigate([RouteUrls.main]);
            });
        }
    }

    private getLoginForm(): FormGroup {
        const form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required]
        });
        return form;
    }
}
