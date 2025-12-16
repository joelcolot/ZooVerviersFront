import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '@core/enums';
import { AuthService } from '@core/services';

export const isEmployeeGuard: CanActivateFn = (route, state) => {
    const _auth = inject(AuthService);
    const _router = inject(Router);
    let isAllowed: boolean = true;
    if (!_auth.isConnected() || _auth.role()==UserRole.Client)
    {
        isAllowed=false;
        _router.navigate(["/", "error", "403"]);
    }
    
    return isAllowed;
};
