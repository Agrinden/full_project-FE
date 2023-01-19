import { defaultMenuTabs } from './../../constants/menu';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],

    standalone: true,
    imports: [
        MatTabsModule,
        MatIconModule,
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatDialogModule,
        MatSlideToggleModule,
        ReactiveFormsModule
    ]
})
export class HeaderComponent {
    public links = defaultMenuTabs;
    public activeLink = this.links[0];

    constructor() {}
}
