import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { EmployeeDetails } from '@core/models';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
    private _http = inject(HttpClient);
    private _auth = inject(AuthService);
    //OwnAccountDetails: EmployeeDetails|null=null;
    async DisplayEmployeeAccount(): Promise<EmployeeDetails>
    {
        return firstValueFrom(this._http.get<EmployeeDetails>(environment.apiUrl+"api/employee/MyEmployeeSheet"));
        //return this.OwnAccountDetails;
    }

}
