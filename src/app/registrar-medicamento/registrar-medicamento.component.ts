import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MedicamentoService } from '../shared/medicamento.service';
import { AuthService } from '../shared/cookie.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar-medicamento',
  templateUrl: './registrar-medicamento.component.html',
  styleUrls: ['./registrar-medicamento.component.css']
})
export class RegistrarMedicamentoComponent {
  constructor(private router: Router, private medicamentoService: MedicamentoService,  private authService: AuthService,) { }

  codigo: string = ""
  nome: string = ""
  categoria: string = ""

  sair() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    this.router.navigate(['/login']);
  }
  atenderPacientes() {
    this.router.navigate(['/medicos']);
  }

  registrar() {
    const jwt = this.authService.getJwt()

    this.medicamentoService.register(this.nome, this.codigo, this.categoria, jwt).subscribe(
      (response) => {
        Swal.fire(
          'Sucesso!',
          response.message,
          'success'
        )
        this.router.navigate(['/medicos']);
      },
      (error) => {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        this.router.navigate(['/login']);
      }
    );
  }
}
