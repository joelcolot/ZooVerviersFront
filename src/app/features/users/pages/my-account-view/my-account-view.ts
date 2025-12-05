import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '@core/enums';
import { userAccount } from '@core/models/user-account.model';
import { AuthService } from '@core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-account-view',
  imports: [TranslatePipe],
  templateUrl: './my-account-view.html',
  styleUrl: './my-account-view.scss',
})
export class MyAccountView 
{
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);
    //isConnected: boolean = this._authService.isConnected();
    myAccount: userAccount | null = null;



    getAccount()
    {
        if (this._authService.isConnected())
        {
            this.myAccount = this._authService.getAccount();
        }
        else
        {
          this._router.navigate(["/", "auth", "login"]);
        }
    }
}
