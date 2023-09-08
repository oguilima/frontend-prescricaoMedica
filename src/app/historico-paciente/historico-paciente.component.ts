import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrescricaoService } from '../shared/prescricao.service';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../shared/paciente.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-historico-paciente',
  templateUrl: './historico-paciente.component.html',
  styleUrls: ['./historico-paciente.component.css']
})
export class HistoricoPacienteComponent implements OnInit {
  constructor(private router: Router, private prescricaoService: PrescricaoService,
    private route: ActivatedRoute, private pacienteService: PacienteService,) { }

  nomePaciente: string = ""
  cpfPaciente: string = ""
  dataNascimentoPaciente: string = ""

  receitas: any[] = [];



  ngOnInit(): void {
    this.getDadosPaciente()
  }

  getHistorico(): void {
    this.prescricaoService.getHistoricoPrescricao(this.cpfPaciente).subscribe(
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
        this.pacienteService.getPacientesPcpf(cpf).subscribe(
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
      this.prescricaoService.getHistoricoRemediosPrescricao(idReceita).subscribe(
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
