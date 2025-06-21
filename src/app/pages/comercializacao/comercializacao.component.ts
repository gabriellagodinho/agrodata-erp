import { Component } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comercializacao',
  templateUrl: './comercializacao.component.html',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./comercializacao.component.scss']
})
export class ComercializacaoComponent {
  title = 'Comercialização e Logística';
  subtitle = 'Gestão de vendas, contratos e transporte de produtos agrícolas';

  // Mock data for sales
  activeTab = 'vendas'; // 'vendas', 'contratos', 'logistica', 'armazens'

  // Mock data for sales
  vendas = [
    {
      id: 1,
      produto: 'Soja',
      quantidade: 5000,
      unidade: 'Sacas',
      valorUnitario: 150.50,
      valorTotal: 752500.00,
      cliente: 'Cooperativa Agrícola Central',
      dataVenda: '2025-05-15',
      status: 'Concluída'
    },
    {
      id: 2,
      produto: 'Milho',
      quantidade: 3000,
      unidade: 'Sacas',
      valorUnitario: 85.75,
      valorTotal: 257250.00,
      cliente: 'Indústria de Rações Nutrimax',
      dataVenda: '2025-06-02',
      status: 'Em andamento'
    },
    {
      id: 3,
      produto: 'Café',
      quantidade: 500,
      unidade: 'Sacas',
      valorUnitario: 1200.00,
      valorTotal: 600000.00,
      cliente: 'Exportadora Café Brasil',
      dataVenda: '2025-06-10',
      status: 'Pendente'
    }
  ];

  // Mock data for contracts
  contratos = [
    {
      id: 1,
      tipo: 'Venda Futura',
      produto: 'Soja',
      quantidade: 10000,
      unidade: 'Sacas',
      valorUnitario: 155.00,
      valorTotal: 1550000.00,
      contraparte: 'Trading Agro Global',
      dataInicio: '2025-06-01',
      dataEntrega: '2025-12-15',
      status: 'Ativo'
    },
    {
      id: 2,
      tipo: 'Barter',
      produto: 'Milho',
      quantidade: 5000,
      unidade: 'Sacas',
      valorUnitario: 90.00,
      valorTotal: 450000.00,
      contraparte: 'Insumos Agrícolas S.A.',
      dataInicio: '2025-05-10',
      dataEntrega: '2025-11-20',
      status: 'Ativo'
    },
    {
      id: 3,
      tipo: 'Armazenagem',
      produto: 'Café',
      quantidade: 1000,
      unidade: 'Sacas',
      valorUnitario: 25.00,
      valorTotal: 25000.00,
      contraparte: 'Armazéns Gerais Café',
      dataInicio: '2025-06-15',
      dataEntrega: '2025-09-15',
      status: 'Pendente'
    }
  ];

  // Mock data for logistics
  logistica = [
    {
      id: 1,
      tipo: 'Transporte',
      origem: 'Fazenda Santa Luzia',
      destino: 'Porto de Santos',
      produto: 'Soja',
      quantidade: 5000,
      unidade: 'Sacas',
      transportadora: 'Transportes Rápidos Ltda',
      dataColeta: '2025-06-20',
      dataEntrega: '2025-06-22',
      valorFrete: 15000.00,
      status: 'Agendado'
    },
    {
      id: 2,
      tipo: 'Transporte',
      origem: 'Fazenda Boa Esperança',
      destino: 'Indústria de Rações Nutrimax',
      produto: 'Milho',
      quantidade: 3000,
      unidade: 'Sacas',
      transportadora: 'Logística Rural S.A.',
      dataColeta: '2025-06-05',
      dataEntrega: '2025-06-06',
      valorFrete: 8500.00,
      status: 'Concluído'
    },
    {
      id: 3,
      tipo: 'Exportação',
      origem: 'Armazém Central',
      destino: 'Porto de Paranaguá',
      produto: 'Café',
      quantidade: 500,
      unidade: 'Sacas',
      transportadora: 'Exporta Agro Ltda',
      dataColeta: '2025-06-25',
      dataEntrega: '2025-06-28',
      valorFrete: 12000.00,
      status: 'Pendente'
    }
  ];

  // Mock data for warehouses
  armazens = [
    {
      id: 1,
      nome: 'Armazém Central',
      tipo: 'Próprio',
      capacidade: 50000,
      unidade: 'Sacas',
      ocupacao: 35000,
      produtos: ['Soja', 'Milho', 'Trigo'],
      endereco: 'Rodovia BR-163, Km 45, Zona Rural',
      responsavel: 'Carlos Mendes',
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Silo Fazenda Norte',
      tipo: 'Próprio',
      capacidade: 20000,
      unidade: 'Sacas',
      ocupacao: 15000,
      produtos: ['Soja', 'Milho'],
      endereco: 'Fazenda Norte, Estrada Vicinal 5, Km 3',
      responsavel: 'Pedro Oliveira',
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Armazém Cooperativa',
      tipo: 'Terceirizado',
      capacidade: 100000,
      unidade: 'Sacas',
      ocupacao: 8000,
      produtos: ['Soja', 'Milho', 'Café'],
      endereco: 'Av. das Indústrias, 1500, Distrito Industrial',
      responsavel: 'Cooperativa Agrícola Central',
      status: 'Contrato Ativo'
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

  // Method to calculate warehouse occupation percentage
  calcularOcupacao(ocupacao: number, capacidade: number): number {
    return (ocupacao / capacidade) * 100;
  }

  // Method to get occupation status class
  getOcupacaoClass(ocupacao: number, capacidade: number): string {
    const percentual = this.calcularOcupacao(ocupacao, capacidade);
    if (percentual < 50) return 'bg-green-500';
    if (percentual < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  }
}
