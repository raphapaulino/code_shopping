import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl = 'http://localhost:8000/api';
  credentials = {
    email: 'admin@user.com',
    password: 'secret'
  }
  showMessageError = false;

  constructor(private httpClient: HttpClient, private router: Router) { // injeção de dependencia automática

  }

  ngOnInit() {

  }

  submit() {
    // envie uma requisição ajax com as credenciais para a API, generics
    this.httpClient.post<any>(`${this.baseUrl}/login`, this.credentials)
      	.subscribe((data) => {
          const token = data.token;
          window.localStorage.setItem('token', token);
          this.router.navigate(['categories/list']);
          // this.http.get('http://localhost:8000/api/categories', {
          // 	headers: {
          // 		'Authorization': `Bearer ${token}`
          // 	}
          // }).subscribe(data => console.log(data)); // executado somente no momento da resposta
      	}, responseError => {
          console.log(responseError)
          this.showMessageError = true;
        });
    return false; // evita que o form seja submetido
  }

}
