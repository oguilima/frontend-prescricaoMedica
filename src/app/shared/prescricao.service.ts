import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrescricaoService {
  constructor(private http: HttpClient) {}

  registrarPrescricao(
    jwt: string,
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
        'Authorization': `Bearer ${jwt}`
      }),
    };

    const url = `http://localhost:3000/v1/receita/create`;

    return this.http.post<any>(url, body, httpOptions);
  }


  getHistoricoPrescricao(jwt: string, cpf: string): Observable<any> {
    const url = `http://localhost:3000/v1/receita/historicoPcpf/historico?cpf=${cpf}`;


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}` // Adicione o token de autorização Bearer
      })
    };

    return this.http.get<any>(url, httpOptions);
  }
  

  getHistoricoRemediosPrescricao(jwt: string, id: string): Observable<any> {
    const url = `http://localhost:3000/v1/receita/medicamentosPreceita/medicamentosReceita?id=${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}` // Adicione o token de autorização Bearer
      })
    };

    return this.http.get(url, httpOptions);
  }
  
}
