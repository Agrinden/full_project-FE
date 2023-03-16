import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    public isLoading = new BehaviorSubject<boolean>(false);
    private pendingRequestCount = 0;

    public show(): void {
        this.pendingRequestCount++;
        this.isLoading.next(this.pendingRequestCount > 0);
    }

    public hide(): void {
        this.pendingRequestCount--;
        this.isLoading.next(this.pendingRequestCount !== 0);
    }
}
