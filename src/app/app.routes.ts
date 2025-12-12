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
        path: "user",
        loadChildren: () => import('./features/users/users.routes').then(z => z.routes),
    },
    {
        path: "error",
        loadChildren: () => import('./features/errors/error.routes').then(z => z.routes),
    },
    {
        path: "animals",
        loadChildren: () => import('./features/animals/animals.routes').then(z => z.routes)
    },
    {
        path: "**",
        redirectTo: "error/404",
    },
];
