import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userAccount } from '@core/models/user-account.model';
import { UserService } from '@core/services';
import { AuthService } from '@core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-account-view',
  imports: [TranslatePipe],
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
  
  
  
    ngOnInit(): void 
    {
        if (this._auth.isConnected())
        {
            this.myAccount = this._auth.getAccount();
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
