import { Component } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent {
  title = 'Projetos e Obras Rurais';
  subtitle = 'Gestão de projetos, construções e infraestrutura rural';

  // Active tab
  activeTab = 'projetos'; // 'projetos', 'obras', 'infraestrutura', 'orcamentos'

  // Mock data for projects
  projetos = [
    {
      id: 1,
      nome: 'Expansão de Armazém',
      tipo: 'Infraestrutura',
      status: 'Em andamento',
      dataInicio: '2025-03-15',
      previsaoTermino: '2025-08-30',
      responsavel: 'Carlos Mendes',
      orcamento: 450000,
      progresso: 65
    },
    {
      id: 2,
      nome: 'Sistema de Irrigação Norte',
      tipo: 'Irrigação',
      status: 'Planejamento',
      dataInicio: '2025-07-10',
      previsaoTermino: '2025-11-20',
      responsavel: 'Ana Souza',
      orcamento: 280000,
      progresso: 15
    },
    {
      id: 3,
      nome: 'Reforma Curral Central',
      tipo: 'Pecuária',
      status: 'Concluído',
      dataInicio: '2025-01-05',
      previsaoTermino: '2025-04-15',
      responsavel: 'Roberto Alves',
      orcamento: 120000,
      progresso: 100
    },
    {
      id: 4,
      nome: 'Construção de Galpão de Máquinas',
      tipo: 'Infraestrutura',
      status: 'Em andamento',
      dataInicio: '2025-05-10',
      previsaoTermino: '2025-09-25',
      responsavel: 'Carlos Mendes',
      orcamento: 350000,
      progresso: 40
    }
  ];

  // Mock data for construction works
  obras = [
    {
      id: 1,
      nome: 'Construção de Barracão',
      local: 'Fazenda São João - Setor Norte',
      status: 'Em andamento',
      dataInicio: '2025-04-10',
      previsaoTermino: '2025-07-15',
      responsavel: 'Construtora Rural Ltda',
      valorContrato: 320000,
      progresso: 55
    },
    {
      id: 2,
      nome: 'Reforma de Casa Sede',
      local: 'Fazenda São João - Sede',
      status: 'Concluído',
      dataInicio: '2025-02-05',
      previsaoTermino: '2025-05-10',
      responsavel: 'Reformas & Cia',
      valorContrato: 180000,
      progresso: 100
    },
    {
      id: 3,
      nome: 'Construção de Estrada Interna',
      local: 'Fazenda São João - Acesso Leste',
      status: 'Planejamento',
      dataInicio: '2025-08-15',
      previsaoTermino: '2025-10-30',
      responsavel: 'Estradas & Terraplanagem SA',
      valorContrato: 250000,
      progresso: 0
    }
  ];

  // Mock data for infrastructure
  infraestrutura = [
    {
      id: 1,
      tipo: 'Estrada',
      nome: 'Estrada Principal',
      extensao: '5.2 km',
      status: 'Bom',
      ultimaManutencao: '2025-01-15',
      proximaManutencao: '2025-07-15',
      observacoes: 'Necessita de cascalhamento em alguns trechos'
    },
    {
      id: 2,
      tipo: 'Ponte',
      nome: 'Ponte Córrego das Pedras',
      extensao: '12 m',
      status: 'Regular',
      ultimaManutencao: '2024-11-10',
      proximaManutencao: '2025-05-10',
      observacoes: 'Verificar estrutura de sustentação'
    },
    {
      id: 3,
      tipo: 'Cerca',
      nome: 'Cerca Perímetro Norte',
      extensao: '3.8 km',
      status: 'Ruim',
      ultimaManutencao: '2024-08-20',
      proximaManutencao: '2025-04-20',
      observacoes: 'Necessita substituição de estacas e arames'
    },
    {
      id: 4,
      tipo: 'Rede Elétrica',
      nome: 'Rede Interna',
      extensao: '4.5 km',
      status: 'Bom',
      ultimaManutencao: '2025-02-05',
      proximaManutencao: '2025-08-05',
      observacoes: 'Manutenção preventiva realizada'
    }
  ];

  // Mock data for budgets
  orcamentos = [
    {
      id: 1,
      projeto: 'Expansão de Armazém',
      fornecedor: 'Construtora Rural Ltda',
      valor: 450000,
      status: 'Aprovado',
      data: '2025-02-20',
      validade: '2025-05-20',
      itens: [
        { descricao: 'Material de construção', valor: 250000 },
        { descricao: 'Mão de obra', valor: 150000 },
        { descricao: 'Equipamentos', valor: 50000 }
      ]
    },
    {
      id: 2,
      projeto: 'Sistema de Irrigação Norte',
      fornecedor: 'Irrigação Moderna SA',
      valor: 280000,
      status: 'Em análise',
      data: '2025-05-15',
      validade: '2025-08-15',
      itens: [
        { descricao: 'Equipamentos de irrigação', valor: 180000 },
        { descricao: 'Instalação', valor: 70000 },
        { descricao: 'Treinamento', valor: 30000 }
      ]
    },
    {
      id: 3,
      projeto: 'Reforma Curral Central',
      fornecedor: 'Reformas & Cia',
      valor: 120000,
      status: 'Concluído',
      data: '2024-12-10',
      validade: '2025-03-10',
      itens: [
        { descricao: 'Material', valor: 70000 },
        { descricao: 'Mão de obra', valor: 50000 }
      ]
    }
  ];

  // Form data for new project
  novoProjeto = {
    nome: '',
    tipo: '',
    dataInicio: '',
    previsaoTermino: '',
    responsavel: '',
    orcamento: 0,
    descricao: ''
  };

  showProjetoForm = false;

  // Method to change active tab
  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Method to toggle project form visibility
  toggleProjetoForm(): void {
    this.showProjetoForm = !this.showProjetoForm;
  }

  // Method to add new project
  adicionarProjeto(): void {
    if (this.validarFormularioProjeto()) {
      const novoId = this.projetos.length > 0 ? Math.max(...this.projetos.map(p => p.id)) + 1 : 1;

      this.projetos.push({
        id: novoId,
        nome: this.novoProjeto.nome,
        tipo: this.novoProjeto.tipo,
        status: 'Planejamento',
        dataInicio: this.novoProjeto.dataInicio,
        previsaoTermino: this.novoProjeto.previsaoTermino,
        responsavel: this.novoProjeto.responsavel,
        orcamento: this.novoProjeto.orcamento,
        progresso: 0
      });

      // Reset form
      this.novoProjeto = {
        nome: '',
        tipo: '',
        dataInicio: '',
        previsaoTermino: '',
        responsavel: '',
        orcamento: 0,
        descricao: ''
      };

      this.showProjetoForm = false;
    }
  }

  // Method to validate project form
  validarFormularioProjeto(): boolean {
    return this.novoProjeto.nome.trim() !== '' &&
           this.novoProjeto.tipo.trim() !== '' &&
           this.novoProjeto.dataInicio !== '' &&
           this.novoProjeto.previsaoTermino !== '' &&
           this.novoProjeto.responsavel.trim() !== '' &&
           this.novoProjeto.orcamento > 0;
  }

  // Method to format number as currency
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }

  // Method to get status class
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'em andamento':
        return 'bg-blue-100 text-blue-800';
      case 'planejamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluído':
        return 'bg-green-100 text-green-800';
      case 'atrasado':
        return 'bg-red-100 text-red-800';
      case 'aprovado':
        return 'bg-green-100 text-green-800';
      case 'em análise':
        return 'bg-yellow-100 text-yellow-800';
      case 'bom':
        return 'bg-green-100 text-green-800';
      case 'regular':
        return 'bg-yellow-100 text-yellow-800';
      case 'ruim':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to calculate total budget
  calcularOrcamentoTotal(): number {
    return this.projetos.reduce((sum, projeto) => sum + projeto.orcamento, 0);
  }

  // Method to calculate average progress
  calcularProgressoMedio(): number {
    if (this.projetos.length === 0) return 0;
    const total = this.projetos.reduce((sum, projeto) => sum + projeto.progresso, 0);
    return Math.round(total / this.projetos.length);
  }

  // Method to count projects by status
  contarProjetosPorStatus(status: string): number {
    return this.projetos.filter(projeto => projeto.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Method to count obras by status
  contarObrasPorStatus(status: string): number {
    return this.obras.filter(obra => obra.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Method to calculate total valor contrato for obras
  calcularValorTotalObras(): number {
    return this.obras.reduce((sum, obra) => sum + obra.valorContrato, 0);
  }

  // Method to count infraestrutura by status
  contarInfraestruturaPorStatus(status: string): number {
    return this.infraestrutura.filter(item => item.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Method to count infraestrutura needing maintenance
  contarInfraestruturaManutencao(): number {
    return this.infraestrutura.filter(item => item.status.toLowerCase() !== 'bom').length;
  }

  // Method to count orcamentos by status
  contarOrcamentosPorStatus(status: string): number {
    return this.orcamentos.filter(orc => orc.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Method to calculate total valor for orcamentos
  calcularValorTotalOrcamentos(): number {
    return this.orcamentos.reduce((sum, orc) => sum + orc.valor, 0);
  }
}
