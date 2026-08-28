import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pagamentos`);
  }

  listarPorAno(ano: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pagamentos/ano/${ano}`);
  }

  criar(pagamento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pagamentos`, pagamento);
  }

  atualizar(id: number, pagamento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pagamentos/${id}`, pagamento);
  }
}