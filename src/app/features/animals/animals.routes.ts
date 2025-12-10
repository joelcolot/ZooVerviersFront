import { Routes } from '@angular/router';



export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/animals-listing-page/animals-listing-page').then(c => c.AnimalsListingPage)
    },
    {
        path: 'details/:name',
        loadComponent: () => import('./pages/animals-details-page/animals-details-page').then(c => c.AnimalsDetailsPage)
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/create-page/create-page').then(c => c.CreatePage)
    },
]