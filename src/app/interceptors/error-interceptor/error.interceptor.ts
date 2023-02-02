import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    public durationInSeconds = 5000;
    public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    public verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private snackBar: MatSnackBar) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req).pipe(
            catchError(err => {
                return of(
                    this.snackBar.openFromComponent(SnackBarComponent, {
                        duration: this.durationInSeconds,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        data: err.error.message
                    })
                );
            })
        );
    }
}
