import { ErrorHandler } from "@angular/core";
import { ErrorService } from "./error.service";

export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService) {}

  handleError(error: any): void {
    this.errorService.handleGlobalError(error);
    
    console.error('Global Error:', error);
  }
}