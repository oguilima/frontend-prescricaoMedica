import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(private http: HttpClient) { }

    register(documento: string, name: string, password: string, dataNascimento: string, criarMedico: boolean): Observable<any> {
        const credentials = {
            crm: documento,
            cpf: documento,
            senha: password,
            nome: name,
            datanascimento: dataNascimento
        };
        
        console.log(credentials)

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        const url = criarMedico == true ? 'http://localhost:3000/v1/medicos/create' : 'http://localhost:3000/v1/paciente/create'

        // Faça a solicitação HTTP para a API com o corpo RAW em formato JSON
        return this.http.post<any>(url, credentials, httpOptions);
    }
}
