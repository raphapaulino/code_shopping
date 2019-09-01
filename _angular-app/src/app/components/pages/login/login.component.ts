import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    showMessageError = false;

    constructor(private authService: AuthService, private router: Router) { // injeção de dependencia automática
    }

    ngOnInit() {
    }

    submit() {
        // envie uma requisição ajax com as credenciais para a API, generics
        this.authService.login(this.credentials)
            .subscribe((data) => {
                // const token = data.token;
                // window.localStorage.setItem('token', token);
                this.router.navigate(['categories/list']);
            }, () => this.showMessageError = true);
        return false; // evita que o form seja submetido
    }

}
