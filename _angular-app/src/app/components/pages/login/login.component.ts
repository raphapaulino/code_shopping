import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }

  constructor(private http: HttpClient) { // injeção de dependencia automática

  }

  ngOnInit() {

  }

  submit() {
    alert('submeteu');
    // envie uma requisição ajax com as credenciais para a API
    this.http.post('http://localhost:8000/api/login', this.credentials)
      .subscribe((data) => console.log(data));
    return false; // evita que o form seja submetido
  }

}
