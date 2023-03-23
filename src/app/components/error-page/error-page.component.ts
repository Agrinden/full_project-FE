import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss'],

    standalone: true,
    imports: [RouterModule]
})
export class ErrorPageComponent {}
