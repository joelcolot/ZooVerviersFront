import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'My-Account',
        loadComponent: () => import("./pages/my-account-view/my-account-view").then(y => y.MyAccountView),
    },
];