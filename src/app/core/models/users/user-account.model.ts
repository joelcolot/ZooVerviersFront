import { UserRole } from "@core/enums";

export interface userAccount 
{
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    userId: number;
    subscribed: boolean;
}