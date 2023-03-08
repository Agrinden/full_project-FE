import { Component, Inject, inject } from '@angular/core';

import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { SnackBarData } from 'src/app/interfaces/snackBarData.interface';

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
    public snackBarRef = inject(MatSnackBarRef);
    public isSuccessCondition = this.data.condition;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}
}
