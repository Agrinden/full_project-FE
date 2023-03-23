import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginFormComponent } from './auth-form/login-form.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],

    standalone: true,
    imports: [LoginFormComponent, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule]
})
export class LoginComponent {}
