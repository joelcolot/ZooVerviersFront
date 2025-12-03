import { Routes } from '@angular/router';
import { HomePage } from '@features/animals/pages/home-page/home-page';


export const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: "auth",
        loadChildren: () => import('./features/auth/auth.routes').then(z => z.routes)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/pages/register-page/register-page').then(y => y.RegisterPage),
    },
    {
        path: "login",
        loadComponent: () => import('./features/auth/pages/login-page/login-page').then(y => y.LoginPage),
    },
];
