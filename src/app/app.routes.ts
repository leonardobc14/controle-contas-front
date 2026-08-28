import { Routes } from '@angular/router';
import { Matriz } from './components/matriz/matriz';
import { CadastroContas } from './components/cadastro-contas/cadastro-contas';
import { Orcamento } from './components/orcamento/orcamento';
import { ListaMes } from './components/lista-mes/lista-mes';

export const routes: Routes = [
  { path: '', redirectTo: 'pagamentos', pathMatch: 'full' },
  { path: 'pagamentos', component: Matriz },
  { path: 'lista', component: ListaMes },
  { path: 'contas', component: CadastroContas },
  { path: 'orcamento', component: Orcamento },
];
