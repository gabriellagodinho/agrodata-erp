import { Routes } from '@angular/router';

// Import all page components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropriedadesComponent } from './pages/propriedades/propriedades.component';
import { CultivosComponent } from './pages/cultivos/cultivos.component';
import { PecuariaComponent } from './pages/pecuaria/pecuaria.component';
import { MaquinariaComponent } from './pages/maquinaria/maquinaria.component';
import { IrrigacaoComponent } from './pages/irrigacao/irrigacao.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { FinancasComponent } from './pages/financas/financas.component';
import { ProdutividadeComponent } from './pages/produtividade/produtividade.component';
import { AnalisesComponent } from './pages/analises/analises.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { SegurancaComponent } from './pages/seguranca/seguranca.component';

// Import new page components
import { ComercializacaoComponent } from './pages/comercializacao/comercializacao.component';
import { AmbientalComponent } from './pages/ambiental/ambiental.component';
import { SensoresComponent } from './pages/sensores/sensores.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { ComplianceComponent } from './pages/compliance/compliance.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // Propriedades
  { path: 'propriedades', component: PropriedadesComponent },

  // Agricultura
  { path: 'cultivos', component: CultivosComponent },
  { path: 'pecuaria', component: PecuariaComponent },
  { path: 'maquinaria', component: MaquinariaComponent },
  { path: 'irrigacao', component: IrrigacaoComponent },

  // Gestão
  { path: 'estoque', component: EstoqueComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: 'financas', component: FinancasComponent },
  { path: 'comercializacao', component: ComercializacaoComponent },

  // Relatórios
  { path: 'produtividade', component: ProdutividadeComponent },
  { path: 'analises', component: AnalisesComponent },

  // Inteligência
  { path: 'ambiental', component: AmbientalComponent },
  { path: 'sensores', component: SensoresComponent },
  { path: 'projetos', component: ProjetosComponent },
  { path: 'compliance', component: ComplianceComponent },

  // Sistema
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'perfil', redirectTo: 'configuracoes', pathMatch: 'full' },
  { path: 'seguranca', component: SegurancaComponent },

  // Fallback route
  { path: '**', redirectTo: 'dashboard' }
];
