import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators'
import { User } from '../model';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'code_shopping_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private baseUrl: string = 'http://localhost:8081/api';

    me: User = null;

    constructor(private httpClient: HttpClient) {
      const token = this.getToken();
      this.setUserFromToken(token);
    }

    login(user: {email: string, password: string}): Observable<{token: string}> {
        // envie uma requisição ajax com as credenciais para a API, generics
        return this.httpClient.post<{token: string}>(`${this.baseUrl}/login`, user)
          .pipe(
            tap(response => {
              this.setToken(response.token)
              console.log(this.getToken())
            })
          )
    }

    setToken(token: string) {
      this.setUserFromToken(token);
      token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
    }

    private setUserFromToken(token: string) {
      const decodedPayload = new JwtHelperService().decodeToken(token);
      this.me = decodedPayload ? {
        id: decodedPayload.sub,
        name: decodedPayload.name,
        email: decodedPayload.email,
      } : null;
    }

    getToken(): string | null {
      return window.localStorage.getItem(TOKEN_KEY);
    }

    isAuth(): boolean {
      const token = this.getToken();
      return !new JwtHelperService().isTokenExpired(token);
    }

    logout() {
      return this.httpClient
        .post<{token: string}>(`${this.baseUrl}/logout`, {})
        .pipe(
          tap(() => {
              this.setToken(null)
            }
          )
        );
    }
}
