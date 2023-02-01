import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmationDialogChoice } from '../../enums/dialog-enums';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],

    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class DialogComponent implements OnInit {
    public dialogEnum = ConfirmationDialogChoice;
    public dialogContent = '';

    constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private data: string) {}

    ngOnInit(): void {
        this.dialogContent = this.data;
    }

    public handleClose(res: ConfirmationDialogChoice): void {
        this.dialogRef.close(res);
    }
}
