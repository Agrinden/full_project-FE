import { AuthDataService } from './../services/user/auth-data.service';
import { getAuthUser } from 'src/app/store/selectors/user.selectors';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, take, map } from 'rxjs';
import { AppState } from '../store/data.state';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private store: Store<AppState>, private authDataService: AuthDataService) {}

    canActivate(): boolean {
        const isOwnerUser = this.authDataService.getUserFromJwt();
        console.log(isOwnerUser);

        // const isOwnerUser = this.store
        //     .select(getAuthUser())
        //     .pipe(
        //         filter(data => data?.role === 'Owner'),
        //         take(1)
        //     )
        //     .subscribe();

        if (isOwnerUser) {
            console.log(isOwnerUser);

            return true;
        }
        return false;
    }
}
