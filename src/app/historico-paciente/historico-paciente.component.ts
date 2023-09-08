import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrescricaoService } from '../shared/prescricao.service';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../shared/paciente.service';
import { AuthService } from '../shared/cookie.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-historico-paciente',
  templateUrl: './historico-paciente.component.html',
  styleUrls: ['./historico-paciente.component.css']
})
export class HistoricoPacienteComponent implements OnInit {
  constructor(private router: Router, private prescricaoService: PrescricaoService,
    private route: ActivatedRoute, private pacienteService: PacienteService,
    private authService: AuthService) { }

  nomePaciente: string = ""
  cpfPaciente: string = ""
  dataNascimentoPaciente: string = ""

  receitas: any[] = [];



  ngOnInit(): void {
    this.getDadosPaciente()
  }

  getHistorico(): void {
    const jwt = this.authService.getJwt()

    this.prescricaoService.getHistoricoPrescricao(jwt, this.cpfPaciente).subscribe(
      (data) => {
        this.receitas = data
      },
      (error) => {
        this.receitas = []
        console.error('Erro ao buscar pacientes:', error);
      }
    );
  }

  getDadosPaciente(): void {
    this.route.params.subscribe((params) => {
      const cpf = params['cpf'];
      if (cpf) {
        const jwt = this.authService.getJwt()
        this.pacienteService.getPacientesPcpf(jwt, cpf).subscribe(
          (data) => {
            this.nomePaciente = data.nome
            this.cpfPaciente = data.cpf
            this.dataNascimentoPaciente = data.datanascimento

            this.getHistorico()
          },
          (error) => {
            console.error('Erro ao buscar medicamentos:', error);
          }
        );
      }
    });

  }

  sair() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['/login']);
  }

  voltar() {
    this.router.navigate(['/login']);
  }

  verMedicamentos(idReceita: string) {
    if (idReceita) {
      const jwt = this.authService.getJwt()
      this.prescricaoService.getHistoricoRemediosPrescricao(jwt, idReceita).subscribe(
        (data) => {
          let arrMedicamentos = []
          for(let p = 0; p < data.length; p++){
            arrMedicamentos.push(data[p].nome)
          }

          const medicamentos = arrMedicamentos.join(", ")

          Swal.fire({
            title: '<strong>Medicamentos prescritos:</strong>',
            icon: 'info',
            html: `<p>${medicamentos}</p>`,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: true,
          })

        },
        (error) => {
          console.error('Erro ao buscar medicamentos:', error);
        }
      );
    }
  }
}
