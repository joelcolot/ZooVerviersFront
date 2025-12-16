import { Component, inject, OnInit } from '@angular/core';
import { EmployeeDetails } from '@core/models';
import { AuthService, EmployeeService } from '@core/services';
import { Spinner } from "@components/animation/spinner/spinner";
import { TranslatePipe } from '@ngx-translate/core';
import { UserRole } from '@core/enums';

@Component({
  selector: 'app-employee-own-sheet-page',
  imports: [Spinner, TranslatePipe],
  templateUrl: './employee-own-sheet-page.html',
  styleUrl: './employee-own-sheet-page.scss',
})
export class EmployeeOwnSheetPage implements OnInit {
    private _auth = inject(AuthService);
    private _employee = inject(EmployeeService);
    EmployeeDetails: EmployeeDetails|null=null;
    role: UserRole|null=this._auth.role();
    async ngOnInit(): Promise<void> {
        this.EmployeeDetails = await this._employee.DisplayEmployeeAccount();
        //console.log("loop?");
        
    }

}
