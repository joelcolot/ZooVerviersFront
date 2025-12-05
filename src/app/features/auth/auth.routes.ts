import { Routes } from "@angular/router";
import { isNotConnectedGuard } from "@core/guards/is-not-connected-guard";

export const routes: Routes = [
    {
        path: "login",
        canActivate: [isNotConnectedGuard],
        loadComponent: () => import('./pages/login-page/login-page').then(y => y.LoginPage),
    },
    {
        path: "register",
        canActivate: [isNotConnectedGuard],
        loadComponent: () => import('./pages/register-page/register-page').then(y => y.RegisterPage),
    }
];