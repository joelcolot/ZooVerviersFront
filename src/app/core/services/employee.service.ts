import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { EmployeeDetails, EmployeeFullDetails } from '@core/models';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
    private _http = inject(HttpClient);
    private _auth = inject(AuthService);
    async DisplayEmployeeAccount(): Promise<EmployeeDetails>
    {
        return firstValueFrom(this._http.get<EmployeeDetails>(environment.apiUrl+"api/employee/MyEmployeeSheet"));
    }
    async DisplayOtherEmployeeAccount(id: number): Promise<EmployeeDetails>
    {
        return firstValueFrom(this._http.get<EmployeeDetails>(environment.apiUrl+"api/employee/EmployeeSheet/"+id));
    }
    async AddEmployee(newEmployee: EmployeeFullDetails): Promise<EmployeeFullDetails>
    {
        return firstValueFrom(this._http.post<EmployeeFullDetails>(environment.apiUrl+"api/employee/NewEmployee", newEmployee));
    }
    async FireEmployee(userId: number): Promise<void>
    {
        return firstValueFrom(this._http.post<void>(environment.apiUrl+"api/employee/FireEmployee/"+userId, userId))
    }

}
