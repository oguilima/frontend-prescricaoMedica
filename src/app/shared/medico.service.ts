import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpClient) {}

  getMedicosPtoken(token: string): Observable<any> {
    const url = `http://localhost:3000/v1/medicos/token/${token}`
    return this.http.get(url);
  }
}
