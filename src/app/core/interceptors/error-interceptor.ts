import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '@core/services/error.service';
import { catchError, of, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const _errorService = inject(ErrorService);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            _errorService.handleHttpError(error);
            return throwError(() => error);
        })
    );
};
