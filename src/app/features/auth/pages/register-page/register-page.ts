import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

interface StrongPasswordErrors {
  lowerCase?: boolean;
  upperCase?: boolean;
  number?: boolean;
  tooShort?: boolean;
  specialChar?: boolean;
}


@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {

private readonly _fb = inject(FormBuilder);
private readonly _authService = inject(AuthService);
private readonly _router = inject(Router);

firstName = new FormControl('', [
  Validators.required,
  Validators.minLength(2),
  Validators.maxLength(50),
]);
lastName = new FormControl('', [
  Validators.required,
  Validators.minLength(2),
  Validators.maxLength(50),
]);
email = new FormControl('', [Validators.required, Validators.email]);
password = new FormControl('', [Validators.required, strongPasswordValidator()]);

registerForm = this._fb.group({
  firstName: this.firstName,
  lastName: this.lastName,
  email: this.email,
  password: this.password,
})



registerError = '';

  onSubmit() {
    if (this.registerForm.valid) {
      this._authService
        .register({
          firstName: this.registerForm.value.firstName!,
          lastName: this.registerForm.value.lastName!,
          email: this.registerForm.value.email!,
          password: this.registerForm.value.password!,
        })
        .then(() => {
          
          this._router.navigate(['/auth/login']);
        })
        .catch((err) => {
          console.error(err);
          this.registerError = err.message;
        });
    }
  }

}
function strongPasswordValidator(): import("@angular/forms").ValidatorFn {
  return (control) => {
    const value = control.value;

    // traitement

    const resultat: StrongPasswordErrors = {};

    // lowecase
    const lowerCaseRegex = /.*?[a-z]/;
    if (!lowerCaseRegex.test(value)) {
      resultat.lowerCase = true;
    }

    // uppercase
    const upperCaseRegex = /.*?[A-Z]/;
    if (!upperCaseRegex.test(value)) {
      resultat.upperCase = true;
    }

    // number
    const numberRegex = /.*?[0-9]/;
    if (!numberRegex.test(value)) {
      resultat.number = true;
    }

    // special char
    const specialCharRegex = /.*?[\W_]/;
    if (!specialCharRegex.test(value)) {
      resultat.specialChar = true;
    }

    // min length 8
    if (value?.length < 8) {
      resultat.tooShort = true;
    }

    // si on a des erreurs, on les retourne
    if (Object.keys(resultat).length > 0) {
      return resultat;
    }

    // strong password
    return null;
}}
