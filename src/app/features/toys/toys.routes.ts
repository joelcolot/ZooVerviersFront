import { Routes } from '@angular/router';




export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/toys-listing-page/toys-listing-page').then(c => c.ToysListingPage)
    },
    {
        path: 'donate/:toyid/:userid',
        loadComponent: () => import('./pages/toys-donation-page/toys-donation-page').then(c => c.ToysDonationPage)
    },
]