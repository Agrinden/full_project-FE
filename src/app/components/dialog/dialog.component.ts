import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
    public dialogContent = 'Do you realy want to delete this user?';
    public dialogEnum = ConfirmationDialogChoice;

    constructor(private dialogRef: MatDialogRef<DialogComponent>) {}

    ngOnInit(): void {
        this.dialogContent;
    }

    public handleClose(res: ConfirmationDialogChoice): void {
        this.dialogRef.close(res);
    }
}
