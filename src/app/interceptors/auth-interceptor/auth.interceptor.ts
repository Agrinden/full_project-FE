import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/data.state';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('userToken');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', idToken)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
