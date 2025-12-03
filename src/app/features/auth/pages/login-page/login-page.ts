import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from '@core/models/api-error.model';
import { AuthService } from '@core/services/auth.service';
import { strongPasswordValidator } from '@core/validators/strong-password.validator';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
    private readonly _fb = inject(FormBuilder);
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);
    private readonly _translate = inject(TranslateService);

    email = new FormControl("", [Validators.required, Validators.email]);
    password = new FormControl("", [Validators.required, strongPasswordValidator()]);
    loginForm = this._fb.group({
        email:this.email,
        password:this.password,
    });

    loginError="";

    async onSubmit()
    {
        if (this.loginForm.valid)
        {
            try
            {
                await this._authService.login(this.loginForm.value.email!, this.loginForm.value.password!);
                this._router.navigate(["/"]);
            }
            catch(err)
            {
                console.error(err);
                this.loginError = (err as ApiError).message;
            }
        }

    }


    onChangeLanguage(lang: string) {
    this._translate.use(lang);
  }
      onSelectLanguage(lang: any) {
        console.log(lang.target.value);
        
    this._translate.use(lang.target.value);
  }

}
