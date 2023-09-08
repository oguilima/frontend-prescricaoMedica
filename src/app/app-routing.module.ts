import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicosComponent } from './medicos/medicos.component';
import { RegistrarMedicamentoComponent } from './registrar-medicamento/registrar-medicamento.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { HistoricoPacienteComponent } from './historico-paciente/historico-paciente.component';

import { AuthGuard, AuthGuardLogged } from './shared/auth.guard';

const routes: Routes = [
  // Configuração da rota de login
  { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
  { path: 'register', canActivate: [AuthGuard], component: RegisterComponent },
  { path: 'medicos', canActivate: [AuthGuardLogged], component: MedicosComponent },
  { path: 'medicamentos', canActivate: [AuthGuardLogged], component: RegistrarMedicamentoComponent },
  { path: 'atendimento/:cpf', canActivate: [AuthGuardLogged], component: AtendimentoComponent },
  { path: 'historico/:cpf', canActivate: [AuthGuardLogged], component: HistoricoPacienteComponent },
  // Redirecionamento da rota vazia ('') para o login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
