import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../shared/register.service';
import { AuthService } from '../shared/cookie.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private registerService: RegisterService, private authService: AuthService, private router: Router) { }

  documento: string = "";
  nome: string = ""
  password: string = "";
  dtNascimento: string = "";


  registrar() {
    const medico = this.documento.indexOf("CRM") === -1 ? false : true

    this.registerService.register(this.documento, this.nome, this.password, this.dtNascimento, medico).subscribe(
      (response) => {
        // Verifique se a resposta contém o JWT
        if (response && response.token) {

          Swal.fire(
            'Sucesso!',
            'O usuário foi criado corretamente!',
            'success'
          )

          medico ? this.authService.setJwt(response.token) : ""
          medico ? this.router.navigate(['/medicos']) : this.router.navigate(['/login'])
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: "Não foi possível cadastrar usuário.",
          })
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: "Não foi possível cadastrar usuário.",
        })
      }
    );
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}