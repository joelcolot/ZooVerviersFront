import { Routes } from '@angular/router';
import { isAdminGuard } from '@core/guards/is-admin-guard';



export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/animals-listing-page/animals-listing-page').then(c => c.AnimalsListingPage)
    },
    {
        path: 'details/:name',
        //canActivate: [isAdminGuard],
        loadComponent: () => import('./pages/animals-details-page/animals-details-page').then(c => c.AnimalsDetailsPage)
    },
]