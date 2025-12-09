import { UserRole } from '@core/enums';

export interface Token {
  userId: number;
  iat: number;
  exp: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": UserRole;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid": number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn": string;

}