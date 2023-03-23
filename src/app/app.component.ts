import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthDataService } from './services/user/auth-data.service';
import { loadAuthUsersSuccess } from './store/actions/user.actions';
import { AppState } from './store/data.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private authData: AuthDataService, private store: Store<AppState>) {}
    ngOnInit(): void {
        const userData = this.authData.getUserFromJwt();

        if (userData) {
            this.store.dispatch(loadAuthUsersSuccess({ authUser: userData }));
        }
    }
}
