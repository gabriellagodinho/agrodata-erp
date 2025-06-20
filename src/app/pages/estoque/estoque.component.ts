import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  imports: [
    NgClass,
    NgIf
  ],
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent {
  title = 'Estoque e Armazéns';
  subtitle = 'Gestão de insumos, produtos e armazenamento';

  // Mock data for inventory items
  activeTab = 'insumos'; // 'insumos', 'produtos', 'armazens'

  // Mock data for inputs (insumos)
  insumos = [
    {
      id: 1,
      codigo: 'INS-001',
      nome: 'Fertilizante NPK',
      categoria: 'Fertilizante',
      quantidade: 1500,
      unidade: 'kg',
      localArmazenamento: 'Armazém A',
      dataValidade: '2026-05-15',
      status: 'Disponível'
    },
    {
      id: 2,
      codigo: 'INS-002',
      nome: 'Herbicida Seletivo',
      categoria: 'Defensivo',
      quantidade: 200,
      unidade: 'L',
      localArmazenamento: 'Armazém B',
      dataValidade: '2025-12-10',
      status: 'Disponível'
    },
    {
      id: 3,
      codigo: 'INS-003',
      nome: 'Semente de Milho',
      categoria: 'Semente',
      quantidade: 800,
      unidade: 'kg',
      localArmazenamento: 'Armazém A',
      dataValidade: '2025-08-20',
      status: 'Baixo Estoque'
    }
  ];

  // Mock data for products (produtos)
  produtos = [
    {
      id: 1,
      codigo: 'PROD-001',
      nome: 'Soja em Grão',
      categoria: 'Grãos',
      quantidade: 25000,
      unidade: 'kg',
      localArmazenamento: 'Silo 1',
      dataColheita: '2025-04-10',
      status: 'Disponível'
    },
    {
      id: 2,
      codigo: 'PROD-002',
      nome: 'Milho em Grão',
      categoria: 'Grãos',
      quantidade: 18000,
      unidade: 'kg',
      localArmazenamento: 'Silo 2',
      dataColheita: '2025-03-15',
      status: 'Reservado'
    },
    {
      id: 3,
      codigo: 'PROD-003',
      nome: 'Café em Grão',
      categoria: 'Grãos',
      quantidade: 5000,
      unidade: 'kg',
      localArmazenamento: 'Armazém C',
      dataColheita: '2025-05-20',
      status: 'Disponível'
    }
  ];

  // Mock data for warehouses (armazens)
  armazens = [
    {
      id: 1,
      codigo: 'ARM-001',
      nome: 'Armazém A',
      tipo: 'Insumos',
      capacidade: 5000,
      unidade: 'kg',
      ocupacao: 3200,
      temperatura: 22,
      umidade: 60,
      status: 'Operacional'
    },
    {
      id: 2,
      codigo: 'ARM-002',
      nome: 'Armazém B',
      tipo: 'Defensivos',
      capacidade: 2000,
      unidade: 'L',
      ocupacao: 800,
      temperatura: 18,
      umidade: 50,
      status: 'Operacional'
    },
    {
      id: 3,
      codigo: 'SIL-001',
      nome: 'Silo 1',
      tipo: 'Grãos',
      capacidade: 50000,
      unidade: 'kg',
      ocupacao: 25000,
      temperatura: 24,
      umidade: 45,
      status: 'Operacional'
    }
  ];

  // Method to change active tab
  changeTab(tab: string): void {
    this.activeTab = tab;
  }
}
