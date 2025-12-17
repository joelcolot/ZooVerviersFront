import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

    handleHttpError(error: HttpErrorResponse): void {   
        this.logError(error); // optional external logging
    }

    handleGlobalError(error: any): void 
    {
        this.logError(error);
    }

  private getHttpMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: return 'Bad Request';
      case 401: return 'Unauthorized';
      case 403: return 'Forbidden';
      case 404: return 'Not Found';
      case 500: return 'Internal Server Error';
      default: return 'Unexpected error occurred';
    }
  }

  private logError(error: any) {
    // Send to monitoring tools
    console.error('Logging to external service:', error);
  }
}
