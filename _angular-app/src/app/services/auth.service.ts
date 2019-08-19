import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private baseUrl: string = 'http://localhost:8000/api/login';

    constructor(private httpClient: HttpClient) { }

    login(user: {email: string, password: string}): Observable<{token: string}> {
        // envie uma requisição ajax com as credenciais para a API, generics
        return this.httpClient.post<{token: string}>(`${this.baseUrl}/login`, user);
    }
}
