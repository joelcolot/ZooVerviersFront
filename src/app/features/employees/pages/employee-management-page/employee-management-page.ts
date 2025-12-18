import { Component, inject, output } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-employee-management-page',
  imports: [RouterLink, ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './employee-management-page.html',
  styleUrl: './employee-management-page.scss',
})
export class EmployeeManagementPage {
    private _router = inject(Router);
    displayEmployee: boolean = false;
    idView = output<number>();
    idEmployee: number = 6;
    onDisplayEmployee()
    {
        this.displayEmployee=!this.displayEmployee;
    }
    onViewEmployee(event:any)
    {
        this._router.navigate(["/", "employee", "display-employee", this.idView]);
        
    }
}
