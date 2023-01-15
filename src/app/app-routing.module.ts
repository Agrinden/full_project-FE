import { RouteUrls } from './constants/routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';

const routes: Routes = [
    {
        path: RouteUrls.main,
        loadComponent: () => import('./components/home-layout/home-layout.component').then(m => m.HomeLayoutComponent),
        canActivate: [AuthGuard],
        children: [
            // {
            //     path: RouteUrls.main,
            //     loadComponent: () =>
            //         import('./components/home-layout/home-layout.component').then(m => m.HomeLayoutComponent)
            // }
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
