import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


import { MedicamentoService } from '../shared/medicamento.service';
import { PacienteService } from '../shared/paciente.service';
import { MedicoService } from '../shared/medico.service';
import { AuthService } from "../shared/cookie.service"
import { PrescricaoService } from '../shared/prescricao.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {
  constructor(private router: Router, private prescricaoService: PrescricaoService, 
    private cookieService: AuthService, private medicoService:
     MedicoService, private medicamentoService: 
     MedicamentoService, private pacienteService:
      PacienteService, private route: ActivatedRoute) { }

  medicamentos: any[] = [];

  arrCodigos: any[] = [];

  nomePaciente: string = ""
  cpfPaciente: string = ""
  dataNascimentoPaciente: string = ""


  ngOnInit(): void {
    this.getMedicamentos();
    this.getDadosPaciente();
  }

  getMedicamentos(): void {
    this.medicamentoService.getMedicamentos().subscribe(
      (data) => {
        this.medicamentos = data;
      },
      (error) => {
        console.error('Erro ao buscar medicamentos:', error);
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
          },
          (error) => {
            console.error('Erro ao buscar medicamentos:', error);
          }
        );
      }
    });

  }

  outroAtendimento() {
    this.router.navigate(['/medicos']);
  }


  sair() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    this.router.navigate(['/login']);
  }


  finalizarAtendimento() {
    // Verifique se os checkboxes estão selecionados
    const checkboxes = document.querySelectorAll('.mat-mdc-checkbox-checked'); // Ajuste o seletor conforme necessário


    if (checkboxes.length > 0) {
      this.arrCodigos = []
      checkboxes.forEach((campo) => {
        this.arrCodigos.push(campo.classList[2].split("_")[1])
      });

      const jwt = this.cookieService.getJwt()

      this.medicoService.getMedicosPtoken(jwt).subscribe(
        (data) => {
          const hoje = new Date();

          const dia = hoje.getDate();
          const mes = hoje.getMonth() + 1;
          const ano = hoje.getFullYear();


          const dataPrescricao = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
          const crm = data.crm
          const cpf = this.cpfPaciente
          const codigosPrescritos = this.arrCodigos


          this.prescricaoService.registrarPrescricao(cpf, crm, dataPrescricao, codigosPrescritos).subscribe(
            (data) => {
              Swal.fire(
                'Sucesso!',
                data.message,
                'success'
              )

              this.router.navigate(['/medicos']);
            },
            (error) => {
              console.error('Erro ao buscar medicamentos:', error);
            }
          );
        },
        (error) => {
          console.error('Erro ao buscar o medico:', error);
        }
      );


    } else {
      // Nenhum checkbox está selecionado, exiba uma mensagem de erro ou realize outra ação, se necessário
      console.log('Nenhum medicamento selecionado. Selecione pelo menos um medicamento para finalizar o atendimento.');
    }
  }

}
