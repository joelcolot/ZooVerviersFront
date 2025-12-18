import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Spinner } from "@components/animation/spinner/spinner";
import { UserRole } from '@core/enums';
import { EmployeeFullDetails } from '@core/models';
import { EmployeeService } from '@core/services';
import { strongPasswordValidator } from '@core/validators/strong-password.validator';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-hire-new-employee',
  imports: [Spinner, ɵInternalFormsSharedModule, ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './hire-new-employee.html',
  styleUrl: './hire-new-employee.scss',
})
export class HireNewEmployee {
    private readonly _form = inject(FormBuilder);
    private readonly _employee = inject(EmployeeService);
    newEmployee: EmployeeFullDetails|null = null;
    // newUser: EmployeeUser|null = null;
    // newAddress: EmployeeAddress|null = null;

    firstName = new FormControl("", [Validators.required, Validators.maxLength(60)]);
    lastName = new FormControl("", [Validators.required, Validators.maxLength(60)]);
    startDate = new FormControl<Date>(new Date(), [Validators.required]);
    endDate = new FormControl<Date>(new Date(), []);
    employeeType = new FormControl<UserRole>(UserRole.Client, [Validators.required, Validators.min(0)]);
    password = new FormControl("", [strongPasswordValidator()]);
    email = new FormControl("", [Validators.required, Validators.email]);
    street = new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
    number = new FormControl(1, [Validators.required, Validators.min(1)]);
    city = new FormControl("", [Validators.required, Validators.maxLength(60)]);
    postalCode = new FormControl(1, [Validators.required, Validators.min(1), Validators.maxLength(999999)]);
    country = new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

    hireEmployee = this._form.group({
        firstName: this.firstName,
        lastName: this.lastName,
        startDate: this.startDate,
        endDate: this.endDate,
        employeeType: this.employeeType,
        email: this.email,
        password: this.password,
        street: this.street,
        number:this.number,
        city: this.city,
        postalCode: this.postalCode,
        country: this.country,
    });


    async onSubmit()
    {
        // this.newAddress = 
        // {
        //     street: this.hireEmployee.getRawValue().street!, 
        //     number: this.hireEmployee.getRawValue().number!,
        //     postalCode: this.hireEmployee.getRawValue().postalCode!,
        //     city: this.hireEmployee.getRawValue().city!,
        //     country: this.hireEmployee.getRawValue().country!
        // };
        // this.newUser = 
        // {
        //     firstName: this.hireEmployee.getRawValue().firstName!,
        //     lastName: this.hireEmployee.getRawValue().lastName!,
        //     email: this.hireEmployee.getRawValue().email!,
        //     password: this.hireEmployee.getRawValue().password!
        // };
        this.newEmployee = 
        {
            street: this.hireEmployee.getRawValue().street!, 
            number: this.hireEmployee.getRawValue().number!,
            postalCode: this.hireEmployee.getRawValue().postalCode!,
            city: this.hireEmployee.getRawValue().city!,
            country: this.hireEmployee.getRawValue().country!,
            firstName: this.hireEmployee.getRawValue().firstName!,
            lastName: this.hireEmployee.getRawValue().lastName!,
            email: this.hireEmployee.getRawValue().email!,
            password: this.hireEmployee.getRawValue().password!,


            startDate: this.hireEmployee.getRawValue().startDate!,
            endDate: this.hireEmployee.getRawValue().endDate,
            role: this.hireEmployee.getRawValue().employeeType!,
            // address: this.newAddress,
            // user: this.newUser,
        };
        await this._employee.AddEmployee(this.newEmployee);
        console.log("ajonction");
        
    }
}
