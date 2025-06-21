import { Component } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ambiental',
  templateUrl: './ambiental.component.html',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./ambiental.component.scss']
})
export class AmbientalComponent {
  title = 'Gestão Ambiental / ESG';
  subtitle = 'Monitoramento e gestão de indicadores ambientais, sociais e de governança';

  // Mock data for environmental indicators
  activeTab = 'indicadores'; // 'indicadores', 'licencas', 'certificacoes', 'relatorios', 'carbono'

  // Mock data for environmental indicators
  indicadores = [
    {
      id: 1,
      nome: 'Consumo de Água',
      valor: 12500,
      unidade: 'm³',
      periodo: 'Último mês',
      tendencia: 'decrescente',
      meta: 11000,
      status: 'Atenção'
    },
    {
      id: 2,
      nome: 'Emissão de CO₂',
      valor: 850,
      unidade: 'ton',
      periodo: 'Último mês',
      tendencia: 'estável',
      meta: 800,
      status: 'Atenção'
    },
    {
      id: 3,
      nome: 'Área de Preservação',
      valor: 450,
      unidade: 'ha',
      periodo: 'Atual',
      tendencia: 'crescente',
      meta: 450,
      status: 'Adequado'
    },
    {
      id: 4,
      nome: 'Uso de Agrotóxicos',
      valor: 1.2,
      unidade: 'kg/ha',
      periodo: 'Último mês',
      tendencia: 'decrescente',
      meta: 1.0,
      status: 'Atenção'
    },
    {
      id: 5,
      nome: 'Consumo de Energia',
      valor: 45000,
      unidade: 'kWh',
      periodo: 'Último mês',
      tendencia: 'crescente',
      meta: 42000,
      status: 'Crítico'
    }
  ];

  // Mock data for environmental licenses
  licencas = [
    {
      id: 1,
      tipo: 'Licença de Operação',
      numero: 'LO-12345/2025',
      orgaoEmissor: 'IBAMA',
      dataEmissao: '2025-01-15',
      dataValidade: '2027-01-15',
      status: 'Vigente',
      observacoes: 'Licença para operação da unidade principal'
    },
    {
      id: 2,
      tipo: 'Outorga de Uso da Água',
      numero: 'OUT-7890/2024',
      orgaoEmissor: 'ANA',
      dataEmissao: '2024-06-10',
      dataValidade: '2029-06-10',
      status: 'Vigente',
      observacoes: 'Autorização para captação de água do Rio Verde'
    },
    {
      id: 3,
      tipo: 'Licença de Supressão Vegetal',
      numero: 'LSV-5432/2025',
      orgaoEmissor: 'Secretaria Estadual de Meio Ambiente',
      dataEmissao: '2025-03-22',
      dataValidade: '2025-09-22',
      status: 'Vencendo',
      observacoes: 'Autorização para supressão controlada em área de expansão'
    },
    {
      id: 4,
      tipo: 'Cadastro Ambiental Rural',
      numero: 'CAR-98765432',
      orgaoEmissor: 'SICAR',
      dataEmissao: '2023-05-18',
      dataValidade: 'Indeterminado',
      status: 'Vigente',
      observacoes: 'Registro da propriedade no Sistema Nacional de Cadastro Ambiental Rural'
    }
  ];

  // Mock data for certifications
  certificacoes = [
    {
      id: 1,
      nome: 'Rainforest Alliance',
      escopo: 'Produção de Café',
      dataObtencao: '2024-08-15',
      dataValidade: '2026-08-15',
      status: 'Vigente',
      auditoriaAgendada: '2025-07-10',
      observacoes: 'Certificação de práticas sustentáveis na produção de café'
    },
    {
      id: 2,
      nome: 'Orgânico IBD',
      escopo: 'Produção de Soja',
      dataObtencao: '2024-11-20',
      dataValidade: '2026-11-20',
      status: 'Vigente',
      auditoriaAgendada: '2025-10-15',
      observacoes: 'Certificação de produção orgânica para exportação'
    },
    {
      id: 3,
      nome: 'RTRS (Round Table on Responsible Soy)',
      escopo: 'Produção de Soja',
      dataObtencao: '2023-09-05',
      dataValidade: '2025-09-05',
      status: 'Vencendo',
      auditoriaAgendada: '2025-08-01',
      observacoes: 'Certificação de produção responsável de soja'
    }
  ];

  // Mock data for carbon credits
  creditosCarbono = [
    {
      id: 1,
      projeto: 'Reflorestamento Área Sul',
      tipo: 'Remoção de CO₂',
      quantidade: 5000,
      unidade: 'tCO₂e',
      dataVerificacao: '2025-02-10',
      status: 'Verificado',
      valorEstimado: 150000.00
    },
    {
      id: 2,
      projeto: 'Agricultura de Baixo Carbono',
      tipo: 'Redução de Emissões',
      quantidade: 3200,
      unidade: 'tCO₂e',
      dataVerificacao: '2025-04-22',
      status: 'Em verificação',
      valorEstimado: 96000.00
    },
    {
      id: 3,
      projeto: 'Energia Solar Fazenda Norte',
      tipo: 'Redução de Emissões',
      quantidade: 1800,
      unidade: 'tCO₂e',
      dataVerificacao: '2024-11-15',
      status: 'Comercializado',
      valorEstimado: 54000.00
    }
  ];

  // Method to change active tab
  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Method to format currency
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  // Method to get status class for indicators
  getStatusClass(status: string): string {
    switch (status) {
      case 'Adequado':
        return 'bg-green-100 text-green-800';
      case 'Atenção':
        return 'bg-yellow-100 text-yellow-800';
      case 'Crítico':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to get trend icon for indicators
  getTrendIcon(tendencia: string): string {
    switch (tendencia) {
      case 'crescente':
        return '↑';
      case 'decrescente':
        return '↓';
      case 'estável':
        return '→';
      default:
        return '-';
    }
  }

  // Method to get trend class for indicators
  getTrendClass(tendencia: string, isPositive: boolean): string {
    if (tendencia === 'crescente') {
      return isPositive ? 'text-green-600' : 'text-red-600';
    } else if (tendencia === 'decrescente') {
      return isPositive ? 'text-red-600' : 'text-green-600';
    } else {
      return 'text-gray-600';
    }
  }

  // Method to get license status class
  getLicenseStatusClass(status: string): string {
    switch (status) {
      case 'Vigente':
        return 'bg-green-100 text-green-800';
      case 'Vencendo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Vencido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to calculate days until expiration
  calcularDiasAteVencimento(dataValidade: string): number {
    if (dataValidade === 'Indeterminado') return Infinity;

    const hoje = new Date();
    const vencimento = new Date(dataValidade);
    const diffTime = vencimento.getTime() - hoje.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Method to get carbon credit status class
  getCarbonStatusClass(status: string): string {
    switch (status) {
      case 'Verificado':
        return 'bg-green-100 text-green-800';
      case 'Em verificação':
        return 'bg-yellow-100 text-yellow-800';
      case 'Comercializado':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
