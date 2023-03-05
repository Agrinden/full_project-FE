import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationFormComponent } from './registr-form/registr-form.component';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],

    standalone: true,
    imports: [RegistrationFormComponent, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule]
})
export class RegistrationComponent {
    constructor() {}
}
