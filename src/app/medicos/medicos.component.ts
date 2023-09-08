import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../shared/paciente.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  constructor(private router: Router, private pacienteService: PacienteService) { }

  cpf: string = ""
  nome: string = ""
  dtNascimento: string = ""

  pacientes: any[] = [];

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(): void {
    this.pacienteService.getPacientes(this.cpf, this.nome, this.dtNascimento).subscribe(
      (data) => {
        this.pacientes = data; 
      },
      (error) => {
        this.pacientes = []
        console.error('Erro ao buscar pacientes:', error);
      }
    );
  }

  sair(){
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    this.router.navigate(['/login']);
  }
  registrarRemedio(){
    this.router.navigate(['/medicamentos']);
  }
  

  atenderPaciente(cpf: string): void{
    this.router.navigate([`/atendimento/${cpf}`]);
  }

  historicoPaciente(cpf: string): void{
    this.router.navigate([`/historico/${cpf}`]);
  }
}
