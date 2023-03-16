import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Subject } from 'rxjs';

import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],

    standalone: true,
    imports: [MatProgressSpinnerModule, CommonModule]
})
export class LoadingComponent {
    public isLoading: Subject<boolean> = this.loadingService.isLoading;

    constructor(private loadingService: LoadingService) {}
}
