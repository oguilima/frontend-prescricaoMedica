import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor(private http: HttpClient) {}

  getPacientes(cpf?: string, nome?: string, datanascimento?: string): Observable<any> {
    const url = 'http://localhost:3000/v1/paciente/filtros'; // Substitua pela URL real da sua API

    // Crie um objeto HttpParams para armazenar os parâmetros da consulta
    let params = new HttpParams();

    // Adicione os parâmetros apenas se eles forem fornecidos
    if (cpf) {
      params = params.set('cpf', cpf);
    }

    if (nome) {
      params = params.set('nome', nome);
    }

    if (datanascimento) {
      params = params.set('datanascimento', datanascimento);
    }

    // Defina os cabeçalhos da solicitação (se necessário)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };

    // Faça a solicitação GET com os parâmetros
    return this.http.get(url, httpOptions);
  }

  getPacientesPcpf(cpf: string): Observable<any> {
    const url = `http://localhost:3000/v1/paciente/${cpf}`
    return this.http.get(url);
  }
}
