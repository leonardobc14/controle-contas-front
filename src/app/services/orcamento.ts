import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  buscar(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orcamento`);
  }

  salvar(orcamento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orcamento`, orcamento);
  }

  buscarSaldo(ano: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orcamento/saldo/${ano}`);
  }
}
