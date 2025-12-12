import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Spinner } from "@components/animation/spinner/spinner";
import { userAccount } from '@core/models';
import { AuthService, UserService } from '@core/services';

@Component({
  selector: 'app-my-account-view',
  imports: [TranslatePipe, Spinner],
  templateUrl: './my-account-view.html',
  styleUrl: './my-account-view.scss',
})
export class MyAccountView implements OnInit
{
    private readonly _auth = inject(AuthService);
    private readonly _user = inject(UserService);
    private readonly _router = inject(Router);
    //isConnected: boolean = this._authService.isConnected();
    myAccount: userAccount | null = null;
    isHidden: boolean = false;
  
  
  
    async ngOnInit(): Promise<void> 
    {
        if (this._auth.isConnected())
        {
            this.myAccount = await this._auth.getAccount();
        }
        else
        {
          this._router.navigate(["/", "auth", "login"]);
        }
    }
    editUserAccount()
    {
        this._router.navigate(["/", "user", "edit"])
    }
    deleteUserConfirmation()
    {
        this.isHidden=true;
    }
    cancelDeletion()
    {
        this.isHidden=false;
    }
    deleteUserDefinitive()
    {
        this._user.deleteAccount("Test1234=");
        this._auth.logout();
        this._router.navigate(["/"]);
    }
}
