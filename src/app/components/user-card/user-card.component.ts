import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
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
export class UserCardComponent implements OnInit {
    @Input() public user: UsersDTO;
    @Output() public deleteEvent = new EventEmitter<string>();
    @Output() public updateEvent = new EventEmitter<UsersDTO>();

    public isEdit: boolean;
    public surName = '';

    constructor() {}

    ngOnInit(): void {
        this.surName = this.user.surName;
    }

    public toggleEdit(): void {
        this.isEdit = !this.isEdit;
    }

    public updateData(): void {
        const user: UsersDTO = { ...this.user, surName: this.surName };
        this.toggleEdit();
        this.updateEvent.emit(user);
    }

    public deleteData(): void {
        this.deleteEvent.emit(this.user._id);
    }
}
