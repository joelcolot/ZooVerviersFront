import { Routes } from '@angular/router';



export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/animals-listing-page/animals-listing-page').then(c => c.AnimalsListingPage)
    },
    {
        path: 'list',
        loadComponent: () => import('./pages/animals-listing-page/animals-listing-page').then(c => c.AnimalsListingPage)
    },
]