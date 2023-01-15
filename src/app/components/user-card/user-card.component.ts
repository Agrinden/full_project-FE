import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';

import { UsersDTO } from './../../interfaces/usersDTO.interface';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],

    standalone: true,
    imports: [CommonModule, MatDialogModule, FormsModule, MatDialogModule]
})
export class UserCardComponent {
    @Input() public user: UsersDTO;
    @Output() public deleteEvent = new EventEmitter<string>();
    @Output() public updateEvent = new EventEmitter<UsersDTO>();

    public isEdit: boolean;

    constructor() {}

    public toggleEdit(): void {
        this.isEdit = !this.isEdit;
    }

    public updateData(): void {
        this.toggleEdit();
        this.updateEvent.emit(this.user);
    }

    public deleteData(): void {
        this.deleteEvent.emit(this.user._id);
    }
}
