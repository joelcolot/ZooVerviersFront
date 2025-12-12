import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '@core/enums';
import { AuthService } from '@core/services';

export const isAdminGuard: CanActivateFn = (route, state) => {
    const _auth = inject(AuthService);
    const _router = inject(Router);
    console.log(_auth.role());
    console.log(_auth.role()!=UserRole.Admin);
    console.log(UserRole.Admin);
    
    
    if (_auth.role()!=UserRole.Admin)
    {
        _router.navigate(["/", "error", "404"]);
        return false;
    }
    return true;
};
