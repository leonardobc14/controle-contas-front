import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContasService } from '../../services/contas';
import { PagamentosService } from '../../services/pagamentos';
import { StatusService } from '../../services/status';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matriz',
  imports: [CommonModule, FormsModule],
  templateUrl: './matriz.html',
  styleUrl: './matriz.css',
})
export class Matriz implements OnInit {
  contas: any[] = [];
  pagamentos: any[] = [];
  statusList: any[] = [];
  anoAtual: number = new Date().getFullYear();
  anos: number[] = [];
  meses: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  constructor(
    private contasService: ContasService,
    private pagamentosService: PagamentosService,
    private statusService: StatusService,
    private cdr: ChangeDetectorRef
  ) {
    const anoCorrente = new Date().getFullYear();
    for (let i = anoCorrente - 5; i <= anoCorrente + 1; i++) {
      this.anos.push(i);
    }
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.contasService.listarContas().subscribe(data => {
      this.contas = data;
      this.cdr.detectChanges();
    });

    this.carregarPagamentos();

    this.statusService.listarTodos().subscribe(data => {
      this.statusList = data;
      this.cdr.detectChanges();
    });
  }

  carregarPagamentos(): void {
    this.pagamentosService.listarPorAno(this.anoAtual).subscribe(data => {
      this.pagamentos = data;
      this.cdr.detectChanges();
    });
  }

  mudarAno(): void {
    this.carregarPagamentos();
  }

  getStatus(contaId: number, mes: number): any {
    const pagamento = this.pagamentos.find(p => p.contaId === contaId && p.mes === mes);
    if (pagamento) {
      return this.statusList.find(s => s.id === pagamento.statusId);
    }
    return null;
  }

  getPagamento(contaId: number, mes: number): any {
    return this.pagamentos.find(p => p.contaId === contaId && p.mes === mes);
  }

  alterarStatus(contaId: number, mes: number): void {
    const pagamento = this.getPagamento(contaId, mes);
    // Ciclo: null -> 1(Pendente) -> 2(Processando) -> 3(Pago) -> 4(N/A) -> 1
    if (pagamento) {
      const novoStatusId = pagamento.statusId >= 4 ? 1 : pagamento.statusId + 1;
      this.pagamentosService.atualizar(pagamento.id, {
        contaId: contaId,
        statusId: novoStatusId,
        mes: mes,
        ano: this.anoAtual
      }).subscribe(() => {
        this.carregarPagamentos();
      });
    } else {
      this.pagamentosService.criar({
        contaId: contaId,
        statusId: 1,
        mes: mes,
        ano: this.anoAtual
      }).subscribe(() => {
        this.carregarPagamentos();
      });
    }
  }
}
