import { Component, inject, model, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError, editAccount, userAccount } from '@core/models';
import { AuthService, UserService } from '@core/services';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-account',
  imports: [TranslatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './edit-account.html',
  styleUrl: './edit-account.scss',
})
export class EditAccount implements OnInit
{
    private readonly _auth = inject(AuthService);
    private readonly _user = inject(UserService);
    private readonly _fb = inject(FormBuilder);
    private readonly _router = inject(Router);
    myAccount: userAccount | null = null;
    newAccount: editAccount | null = null;
    temp: string = "";
    ngOnInit(): void 
    {
        this.myAccount = this._auth.getAccount();
    }

    firstName = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]);
    lastName = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]);
    password = new FormControl('', [Validators.required]);
    editError="";
    editForm = this._fb.group({
        firstName:this.firstName,
        lastName: this.lastName,
        password: this.password,
    });
    async onEdit()
    {
        try
        {
            //console.log( this.editForm.getRawValue());
            this.newAccount={firstName: this.editForm.getRawValue().firstName!, lastName: this.editForm.getRawValue().lastName!, password: this.editForm.getRawValue().password!}
            await this._user.editOwnAccount(this.newAccount);
            this._router.navigate(["/", "user", "My-Account"])
        }
        catch(err)
        {
            console.error(err);
            this.editError = (err as ApiError).message;
        }
        
    }

}
