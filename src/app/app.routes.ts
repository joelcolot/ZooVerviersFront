import { Routes } from '@angular/router';
import { HomePage } from '@features/animals/pages/home-page/home-page';


export const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'register',
        loadComponent: () => import("./features/auth/pages/register-page/register-page").then(c => c.RegisterPage),
    },
    {
        path: 'login',
        loadComponent: () => import("./features/auth/pages/login-page/login-page").then(c => c.LoginPage),
    }
];
