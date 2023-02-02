import { ErrorInterceptor } from './interceptors/error-interceptor/error.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthInterceptor } from './interceptors/auth-interceptor/auth.interceptor';
import { UserEffects } from './store/effects/user.effects';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers } from './store/data.state';

import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem('userToken');
}

@NgModule({
    declarations: [AppComponent, SnackBarComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatDialogModule,
        UserCardComponent,
        MatSnackBarModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([UserEffects]),
        StoreDevtoolsModule.instrument(),

        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ['http://localhost:8000']
            }
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
