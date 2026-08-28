import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContasService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  listarContas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contas`);
  }

  buscarConta(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contas/${id}`);
  }

  criar(conta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contas`, conta);
  }

  atualizar(id: number, conta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/contas/${id}`, conta);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/contas/${id}`);
  }
}
