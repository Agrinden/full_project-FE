import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AdminPageComponent } from '../admin-page/admin-page.component';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],

    standalone: true,
    imports: [CommonModule, MatIconModule, MatMenuModule, RouterModule, AdminPageComponent]
})
export class AdminPanelComponent {
    constructor() {}
}
