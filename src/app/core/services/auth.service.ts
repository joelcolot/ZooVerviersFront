import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { UserRole } from '@core/enums';
import { LoginResponse, Token, userAccount, UserRegisterForm } from '@core/models';
import { environment } from '@env';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injection du HttpClient
  private readonly _httpClient = inject(HttpClient);
  account: userAccount | null=null;;

  // signal pour savoir si l'utilisateur est connecté (calculé à partir du token)
  isConnected: Signal<boolean> = computed(() => !!this.token()); // !! convertit en booléen
  temp: boolean = false;

  private _role = signal<UserRole | null>(null);
  role = this._role.asReadonly();

  // signal pour le token JWT
  private _token = signal<string | null>(null);
  token = this._token.asReadonly();

  constructor() {
    // Récupération du token depuis le localstorage
    const tokenStr = localStorage.getItem('token');

    if (tokenStr) {
      // S'il y a un token, on le met dans le signal
      this._token.set(tokenStr);
    }

    // Effet qui réagit aux changements du signal "token"
    effect(() => {
      // Récupération de la valeur du token
      const token = this._token();
      if (token == null) {
        // S'il n'y a pas de token, on supprime le token du localstorage et on met le role à null
        // (utilisateur déconnecté)
        localStorage.removeItem('token');
        //console.log(localStorage.getItem('token'));
        
        this._role.set(null);
      } else 
      {
        localStorage.setItem('token', token);
        const tokenProp = jwtDecode<Token>(token);
        this._role.set(tokenProp['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      }
    });
  }

  async login(email: string, password: string): Promise<void> 
  {
    const response = await firstValueFrom(
      this._httpClient.post<LoginResponse>(environment.apiUrl + 'api/User/Login', {
        email: email,
        password,
      }),
    );
    this._token.set(response.token);

  }

  register(form: UserRegisterForm): Promise<void> 
  {
    return firstValueFrom(this._httpClient.post<void>(environment.apiUrl + 'api/User/Register', form));
  }

  logout(): void
  {
    this._token.set(null);
  }


  getAccount(): userAccount | null
  {
    if (this._token!==null && localStorage.getItem('token')!==null)
    {
      
      const decodedJWT = jwtDecode<Token>(localStorage.getItem('token')!);
      //console.log(decodedJWT);
      this.account=
      {
        firstName: decodedJWT["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        lastName: decodedJWT["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn"],
        email: decodedJWT['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        role: decodedJWT['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        userId: decodedJWT['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'],
      };
      return this.account;
    }
    return null;
  }
  regenerateToken(token: string)
  {
    this._token.set(token);
  }
}
