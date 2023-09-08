import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrescricaoService {
  constructor(private http: HttpClient) {}

  registrarPrescricao(
    cpfPaciente: string,
    crmMedico: string,
    dataPrescricao: string,
    codigosMedicamentos: string[]
  ): Observable<any> {
    const body = {
      cpfPaciente: cpfPaciente,
      crmMedico: crmMedico,
      dataPrescricao: dataPrescricao,
      codigosMedicamentos: codigosMedicamentos,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const url = `http://localhost:3000/v1/receita/create`;

    return this.http.post<any>(url, body, httpOptions);
  }


  getHistoricoPrescricao(cpf: string): Observable<any> {
    const url = `http://localhost:3000/v1/receita/historicoPcpf/historico?cpf=${cpf}`;
    return this.http.get(url);
  }
  

  getHistoricoRemediosPrescricao(id: string): Observable<any> {
    const url = `http://localhost:3000/v1/receita/medicamentosPreceita/medicamentosReceita?id=${id}`;
    return this.http.get(url);
  }
  
}
