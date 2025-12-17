import { UserRole } from "@core/enums";
import { EmployeeAddress } from "./employee-address.model";
import { EmployeeUser } from "./employee-user.models";

export interface EmployeeDetails 
{
    address: EmployeeAddress;
    user: EmployeeUser;
    role: UserRole;
    employeeType: string;
    startDate: Date;
    endDate: Date|null;
}