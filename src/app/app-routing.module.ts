import { Role } from './enums/role';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guards';
import { RouteUrls } from './constants/routes';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RoleGuard } from './guards/role.guard';

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
            },
            {
                path: RouteUrls.adminPanel,
                loadComponent: () =>
                    import('./components/admin-page/admin-page.component').then(m => m.AdminPageComponent),
                canActivate: [RoleGuard]
            }
        ]
    },
    {
        path: RouteUrls.login,
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: RouteUrls.registration,
        loadComponent: () =>
            import('./components/registration/registration.component').then(m => m.RegistrationComponent)
    },
    {
        path: 'error',
        component: ErrorPageComponent
    },
    {
        path: '**',
        redirectTo: '/error'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
