import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Spinner } from "@components/animation/spinner/spinner";
import { ApiError } from '@core/models';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, TranslatePipe, Spinner],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
    private readonly _fb = inject(FormBuilder);
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    email = new FormControl("", [Validators.required, Validators.email]);
    password = new FormControl("", [Validators.required]);
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
                console.log("validation");
                
                await this._authService.login(this.loginForm.value.email!, this.loginForm.value.password!);
                //this._authService.isConnected();
                this._router.navigate(["/"]);
            }
            catch(err)
            {
                console.error(err);
                this.loginError = (err as ApiError).message;
            }
        }

    }


}
