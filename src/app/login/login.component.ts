import { Component } from '@angular/core';
import { AuthService } from '../shared/cookie.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  username: string = "";
  password: string = "";

 

  login() {
    const medico = this.username.indexOf("CRM") === -1 ? false : true

    this.authService.login(this.username, this.password, medico).subscribe(
      (response) => {

        console.log(response)

        // Verifique se a resposta contém o JWT
        if (response && response.token) {
          // Grave o JWT nos cookies
          this.authService.setJwt(response.token);
          // Redirecione para outra rota, por exemplo, 'dashboard'
          this.router.navigate(['/medicos']);
        } else {
          this.password = ""
        }
      },
      (error) => {
        this.password = ""


        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: "Verificar usuário e/ou senha.",
        })
      }
    );
  }


  registrar() {
    this.router.navigate(['/register']);
  }
}
