import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrcamentoService } from '../../services/orcamento';

@Component({
  selector: 'app-orcamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './orcamento.html',
  styleUrl: './orcamento.css',
})
export class Orcamento implements OnInit {
  anoAtual: number = new Date().getFullYear();
  anos: number[] = [];
  salario: number = 0;
  saldo: any = null;
  salvando = false;

  constructor(
    private orcamentoService: OrcamentoService,
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
    this.orcamentoService.buscar().subscribe(data => {
      if (data) {
        this.salario = data.salario || 0;
      }
      this.cdr.detectChanges();
    });

    this.carregarSaldo();
  }

  carregarSaldo(): void {
    this.orcamentoService.buscarSaldo(this.anoAtual).subscribe(data => {
      this.saldo = data;
      this.cdr.detectChanges();
    });
  }

  mudarAno(): void {
    this.carregarSaldo();
  }

  salvarOrcamento(): void {
    this.salvando = true;
    this.orcamentoService.salvar({ ano: this.anoAtual, salario: this.salario }).subscribe(() => {
      this.salvando = false;
      this.carregarSaldo();
    });
  }
}
