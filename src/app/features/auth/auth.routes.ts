import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "login",
        loadComponent: () => import('./pages/login-page/login-page').then(y => y.LoginPage),
    },
    {
        path: "register",
        loadComponent: () => import('./pages/register-page/register-page').then(y => y.RegisterPage),
    }
];