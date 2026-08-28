import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContasService } from '../../services/contas';
import { PagamentosService } from '../../services/pagamentos';
import { StatusService } from '../../services/status';

@Component({
  selector: 'app-lista-mes',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-mes.html',
  styleUrl: './lista-mes.css',
})
export class ListaMes implements OnInit {
  contas: any[] = [];
  pagamentos: any[] = [];
  statusList: any[] = [];
  anoAtual: number = new Date().getFullYear();
  mesAtual: number = new Date().getMonth() + 1;
  anos: number[] = [];
  meses = [
    { valor: 1, nome: 'Janeiro' },
    { valor: 2, nome: 'Fevereiro' },
    { valor: 3, nome: 'Março' },
    { valor: 4, nome: 'Abril' },
    { valor: 5, nome: 'Maio' },
    { valor: 6, nome: 'Junho' },
    { valor: 7, nome: 'Julho' },
    { valor: 8, nome: 'Agosto' },
    { valor: 9, nome: 'Setembro' },
    { valor: 10, nome: 'Outubro' },
    { valor: 11, nome: 'Novembro' },
    { valor: 12, nome: 'Dezembro' },
  ];

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

    this.statusService.listarTodos().subscribe(data => {
      this.statusList = data;
      this.cdr.detectChanges();
    });

    this.carregarPagamentos();
  }

  carregarPagamentos(): void {
    this.pagamentosService.listarPorAno(this.anoAtual).subscribe(data => {
      this.pagamentos = data;
      this.cdr.detectChanges();
    });
  }

  mudarFiltro(): void {
    this.carregarPagamentos();
  }

  getStatus(contaId: number): any {
    const pagamento = this.pagamentos.find(p => p.contaId === contaId && p.mes === this.mesAtual);
    if (pagamento) {
      return this.statusList.find(s => s.id === pagamento.statusId);
    }
    return null;
  }

  getPagamento(contaId: number): any {
    return this.pagamentos.find(p => p.contaId === contaId && p.mes === this.mesAtual);
  }

  alterarStatus(contaId: number): void {
    const pagamento = this.getPagamento(contaId);
    if (pagamento) {
      const novoStatusId = pagamento.statusId >= 4 ? 1 : pagamento.statusId + 1;
      this.pagamentosService.atualizar(pagamento.id, {
        contaId: contaId,
        statusId: novoStatusId,
        mes: this.mesAtual,
        ano: this.anoAtual
      }).subscribe(() => {
        this.carregarPagamentos();
      });
    } else {
      this.pagamentosService.criar({
        contaId: contaId,
        statusId: 1,
        mes: this.mesAtual,
        ano: this.anoAtual
      }).subscribe(() => {
        this.carregarPagamentos();
      });
    }
  }
}
