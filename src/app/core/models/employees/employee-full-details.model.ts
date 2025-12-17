import { UserRole } from "@core/enums";

export interface EmployeeFullDetails 
{
    street: string;
    number: number;
    city: string;
    postalCode: number;
    country: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    startDate: Date;
    endDate: Date|null;
}