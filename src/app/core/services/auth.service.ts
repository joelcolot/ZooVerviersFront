import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { UserRole } from '@core/enums';
import { LoginResponse } from '@core/models/login-response.model';
import { Token } from '@core/models/token.model';
import { userAccount } from '@core/models/user-account.model';
import { UserRegisterForm } from '@core/models/user-register-form.model';
import { environment } from '@env';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom, Observable, tap } from 'rxjs';

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
      } else {
        // S'il y a un token, on le stocke dans le localstorage et on met à jour le role
        // (utilisateur connecté)
        localStorage.setItem('token', token);
        const tokenProp = jwtDecode<Token>(token);
        this._role.set(tokenProp['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
        console.log(this.isConnected());
    // Appel API pour se connecter
    const response = await firstValueFrom(
      this._httpClient.post<LoginResponse>(environment.apiUrl + 'api/User/Login', {
        email: email,
        password,
      }),
    );

    // Stockage du token dans le signal (ce qui déclenche l'effet)
    this._token.set(response.token);
    
    console.log(this.isConnected());
    
    
  }

  register(form: UserRegisterForm): Promise<void> {
    // Appel API pour s'enregistrer
    return firstValueFrom(this._httpClient.post<void>(environment.apiUrl + 'api/User/Register', form));
  }

  logout() {
    // Déconnexion : on met le token à null (ce qui déclenche l'effet)
    this._token.set(null);
  }


  getAccount(): userAccount | null
  {
    if (this._token!==null && localStorage.getItem('token')!==null)
    {
      const decodedJWT = jwtDecode<Token>(localStorage.getItem('token')!);
      this.account=
      {
        firstName: "Temp",
        lastName: "Orary",
        email: decodedJWT['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        role: decodedJWT['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        userId: decodedJWT['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'],
      };
      return this.account;
    }
    return null;
  }

}
