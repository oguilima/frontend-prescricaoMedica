// cookie.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private http: HttpClient) { }

  isLoggedIn(): boolean {
    
    const token = this.cookieService.get('jwt')

    if(!token){
      return false
    }

    


    return this.cookieService.check('jwt');
  }

  getJwt(): string{
    return this.cookieService.get('jwt')
  }

  // Remove o JWT dos cookies
  clearJwt(): void {
    this.cookieService.delete('jwt');
  }

  // Grava o JWT nos cookies com uma data de expiração de duas horas
  setJwt(jwt: string): void {
    // Calcula a data de expiração em dois horas a partir do momento atual
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000); // 2 horas em milissegundos

    // Define o valor do JWT nos cookies, incluindo a data de expiração
    this.cookieService.set('jwt', jwt, expirationDate, '/', '', false, 'Strict');
  }



  // Método para fazer login e obter o JWT da API
  login(username: string, password: string, tipoLogin: boolean): Observable<any> {
    // Crie um objeto com as credenciais de login
    let credentials = {
      crm: username,
      cpf: username,
      senha: password,
    };

    // Defina as opções de cabeçalho para especificar que você está enviando JSON
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const url = tipoLogin == true ? 'http://localhost:3000/v1/medicos/login' : 'http://localhost:3000/v1/paciente/login'

    // Faça a solicitação HTTP para a API com o corpo RAW em formato JSON
    return this.http.post<any>(url, credentials, httpOptions);
  }
}
