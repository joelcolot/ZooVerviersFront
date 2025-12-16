import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-employee-management-page',
  imports: [RouterLink, ɵInternalFormsSharedModule],
  templateUrl: './employee-management-page.html',
  styleUrl: './employee-management-page.scss',
})
export class EmployeeManagementPage {
    displayEmployee: boolean = false;
    idEmployee: number = 0;
    onDisplayEmployee()
    {
        this.displayEmployee=!this.displayEmployee;
    }
}
