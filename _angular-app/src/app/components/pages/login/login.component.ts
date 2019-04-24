import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: 'admin@user.com',
    password: 'secret'
  }

  constructor(private http: HttpClient) { // injeção de dependencia automática

  }

  ngOnInit() {

  }

  submit() {
    // alert('submeteu');
    // envie uma requisição ajax com as credenciais para a API
    // generics
    this.http.post<any>('http://localhost:8000/api/login', this.credentials)
      	.subscribe((data) => {
			// console.log(data)
			const token = data.token;
			this.http.get('http://localhost:8000/api/categories', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}).subscribe(data => console.log(data)); // executado somente no momento da resposta
      	});
    return false; // evita que o form seja submetido
  }

}
