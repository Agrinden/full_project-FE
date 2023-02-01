import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { UserCardComponent } from './../user-card/user-card.component';
import { HeaderComponent } from './../header/header.component';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],

    standalone: true,
    imports: [CommonModule, FormsModule, UserCardComponent, RouterModule, HeaderComponent]
})
export class HomeLayoutComponent {}
