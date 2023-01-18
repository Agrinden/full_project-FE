import { RouteUrls } from './constants/routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home-layout/home-layout.component').then(m => m.HomeLayoutComponent),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: RouteUrls.main,
                pathMatch: 'full'
            },
            {
                path: RouteUrls.main,
                loadComponent: () => import('./components/main-page/main-page.component').then(m => m.MainPageComponent)
            },
            {
                path: RouteUrls.about,
                loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
            },
            {
                path: RouteUrls.contacts,
                loadComponent: () => import('./components/contacts/contacts.component').then(m => m.ContactsComponent)
            }
        ]
    },
    {
        path: RouteUrls.login,
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        redirectTo: RouteUrls.login,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
