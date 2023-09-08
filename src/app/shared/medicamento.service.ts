import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MedicamentoService {
    constructor(private http: HttpClient) { }

    register(name: string, codigo: string, categoria: string, authToken: string): Observable<any> {
        const credentials = {
            codigo: codigo,
            nome: name,
            categoria: categoria
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}` // Adicione o token de autorização Bearer
            }),
        };

        const url = 'http://localhost:3000/v1/medicamento/create';

        // Faça a solicitação HTTP para a API com o corpo RAW em formato JSON e o token de autorização Bearer
        return this.http.post<any>(url, credentials, httpOptions);
    }

    
    getMedicamentos(jwt: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}` // Adicione o token de autorização Bearer
            }),
        };
        const url = 'http://localhost:3000/v1/medicamento/findAll';
        return this.http.get(url, httpOptions);
    }
}
