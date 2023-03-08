import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { RouteUrls } from './../../../constants/routes';
import { RegistrData } from './../../../interfaces/registrData.interface';
import { AuthDataService } from './../../../services/user/auth-data.service';
import { CustomValidators } from 'src/app/validators/custom.validators';
import { SnackBarComponent } from './../../snack-bar/snack-bar.component';

@Component({
    selector: 'app-regist-form',
    templateUrl: './registr-form.component.html',
    styleUrls: ['./registr-form.component.scss'],

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
export class RegistrationFormComponent implements OnInit {
    public registrForm: FormGroup;
    public isPassVisible: boolean;
    public isConfirmPassVisible: boolean;
    public durationInSeconds = 5000;
    public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    public verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authDataService: AuthDataService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.registrForm = this.getRegistrationForm();
    }

    public registration(): void {
        if (this.registrForm && this.registrForm.valid) {
            const { confirmPassword, ...regData } = this.registrForm.value as RegistrData;
            this.authDataService.registration(regData).subscribe(() => {
                this.openSnackBar('Registration was successful, now you can Log In', true);
                this.router.navigate([RouteUrls.login]);
            });
        }
    }

    public isPasswordsInvalid(): boolean {
        return this.registrForm.invalid && this.registrForm.controls['confirmPassword'].touched;
    }

    public isFormErrorInvalid(): boolean {
        return this.registrForm.touched && this.registrForm.invalid;
    }

    public togglePassVisibility(): void {
        this.isPassVisible = !this.isPassVisible;
    }

    public toggleConfirmPassVisibility(): void {
        this.isConfirmPassVisible = !this.isConfirmPassVisible;
    }

    public openSnackBar(message: string, isNoError: boolean): void {
        this.snackBar.openFromComponent(SnackBarComponent, {
            duration: this.durationInSeconds,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: {
                titleMessage: message,
                condition: isNoError
            }
        });
    }

    private getRegistrationForm(): FormGroup {
        const form = this.formBuilder.group(
            {
                name: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+$/i), Validators.maxLength(100)]],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/),
                        Validators.minLength(8)
                    ]
                ],
                confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
            },
            {
                validator: CustomValidators.checkPasswords('password', 'confirmPassword')
            }
        );
        return form;
    }
}
