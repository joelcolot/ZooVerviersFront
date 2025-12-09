import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { editAccount, Token, userAccount, UserRegisterForm } from '@core/models';
import { environment } from '@env';
import { EditAccount } from '@features/users/pages/edit-account/edit-account';
import { tokenString } from '@core/models/token-string.model';

@Injectable({
  providedIn: 'root',
})
export class UserService 
{
    private readonly _auth = inject(AuthService);
    private readonly _http = inject(HttpClient);
    deleteUser:UserRegisterForm | null=null;
    editUser: UserRegisterForm | null = null;
    token: tokenString = {token: ""};
    
    async editOwnAccount(newAccount: editAccount): Promise<void>
    {
        this.editUser={firstName: newAccount.firstName, lastName: newAccount.lastName, password: newAccount.password, email: this._auth.account!.email};
        this.token = (await firstValueFrom(this._http.put<tokenString>(environment.apiUrl+"api/User/EditAccount", this.editUser)));
        if (this.token)
        {
            this._auth.regenerateToken(this.token.token);
        }
    }

    async deleteAccount(password: string)
    {
        this.deleteUser={firstName: this._auth.getAccount()?.firstName!, lastName: this._auth.getAccount()?.lastName!, password: password, email: this._auth.getAccount()?.email!};        
        if (this.deleteUser.email!==null)
        {
            await firstValueFrom(this._http.delete(environment.apiUrl+"api/User/Delete"));
        }
    }
}

