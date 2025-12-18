import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "400",
        loadComponent: () => import('./pages/not-found-element/not-found-element').then(y => y.NotFoundElement),
    },
    {
        path: "403",
        loadComponent: () => import("./pages/forbidden-page/forbidden-page").then(y => y.ForbiddenPage),
    },
    {
        path: "404",
        loadComponent: () => import("./pages/not-found-page/not-found-page").then(y => y.NotFoundPage),
    },
];