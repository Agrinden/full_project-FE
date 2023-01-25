import { UserEffects } from './store/effects/user.effects';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/data.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HeaderComponent } from './components/header/header.component';

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
        StoreDevtoolsModule.instrument()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
