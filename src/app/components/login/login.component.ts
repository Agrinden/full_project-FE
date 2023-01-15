import { LoginFormComponent } from './auth-form/login-form.component';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],

    standalone: true,
    imports: [LoginFormComponent, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule]
})
export class LoginComponent {}
