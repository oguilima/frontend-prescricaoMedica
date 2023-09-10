import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { RouterModule } from '@angular/router'; 

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MedicosComponent } from './medicos/medicos.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegistrarMedicamentoComponent } from './registrar-medicamento/registrar-medicamento.component';
import {MatCardModule} from '@angular/material/card';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HistoricoPacienteComponent } from './historico-paciente/historico-paciente.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MedicosComponent,
    RegistrarMedicamentoComponent,
    AtendimentoComponent,
    HistoricoPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot([]), 
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
