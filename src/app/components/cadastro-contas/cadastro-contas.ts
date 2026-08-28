import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContasService } from '../../services/contas';

@Component({
  selector: 'app-cadastro-contas',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-contas.html',
  styleUrl: './cadastro-contas.css',
})
export class CadastroContas implements OnInit {
  contas: any[] = [];
  novaConta = { nome: '', valorMedio: 0, ativo: true };
  editando: any = null;

  constructor(
    private contasService: ContasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas(): void {
    this.contasService.listarContas().subscribe(data => {
      this.contas = data;
      this.cdr.detectChanges();
    });
  }

  salvar(): void {
    if (!this.novaConta.nome.trim()) return;

    if (this.editando) {
      this.contasService.atualizar(this.editando.id, this.novaConta).subscribe(() => {
        this.cancelarEdicao();
        this.carregarContas();
      });
    } else {
      this.contasService.criar(this.novaConta).subscribe(() => {
        this.novaConta = { nome: '', valorMedio: 0, ativo: true };
        this.carregarContas();
      });
    }
  }

  editar(conta: any): void {
    this.editando = conta;
    this.novaConta = { nome: conta.nome, valorMedio: conta.valorMedio, ativo: conta.ativo };
  }

  cancelarEdicao(): void {
    this.editando = null;
    this.novaConta = { nome: '', valorMedio: 0, ativo: true };
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta conta?')) {
      this.contasService.excluir(id).subscribe(() => {
        this.carregarContas();
      });
    }
  }
}
