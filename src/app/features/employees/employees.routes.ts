import { Routes } from "@angular/router";
import { isAdminGuard } from "@core/guards/is-admin-guard";
import { isEmployeeGuard } from "@core/guards/is-employee-guard";

export const routes: Routes = [
    {
        path: "",
        canActivate: [isEmployeeGuard],
        loadComponent: () => import("./pages/employee-management-page/employee-management-page").then(y => y.EmployeeManagementPage),
    },
    {
        path: "my-employee-account",
        canActivate: [isEmployeeGuard],
        loadComponent: () => import("./pages/employee-own-sheet-page/employee-own-sheet-page").then(y => y.EmployeeOwnSheetPage),
    },
    {
        path: "display-employee/:id",
        canActivate: [isAdminGuard],
        loadComponent: () => import("./pages/display-employee/display-employee").then(y => y.DisplayEmployee),
    },
    {
        path: "fire-employee/:id",
        canActivate: [isAdminGuard],
        loadComponent: () => import("./pages/fire-employee/fire-employee").then(y => y.FireEmployee),
    },
];