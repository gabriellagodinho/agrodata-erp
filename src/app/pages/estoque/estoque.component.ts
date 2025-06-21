import { Component } from '@angular/core';
import {NgClass, NgIf, NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent {
  title = 'Estoque e Armazéns';
  subtitle = 'Gestão de insumos, produtos e armazenamento';

  // Mock data for inventory items
  activeTab = 'insumos'; // 'insumos', 'produtos', 'armazens', 'combustiveis', 'oleos'

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

  // Mock data for fuels (combustiveis)
  combustiveis = [
    {
      id: 1,
      codigo: 'COMB-001',
      tipo: 'Diesel',
      quantidade: 5000,
      unidade: 'L',
      localArmazenamento: 'Tanque 1',
      ultimaRecarga: '2025-06-10',
      estoqueMinimo: 1000,
      status: 'Disponível'
    },
    {
      id: 2,
      codigo: 'COMB-002',
      tipo: 'Gasolina Comum',
      quantidade: 2500,
      unidade: 'L',
      localArmazenamento: 'Tanque 2',
      ultimaRecarga: '2025-06-05',
      estoqueMinimo: 500,
      status: 'Disponível'
    },
    {
      id: 3,
      codigo: 'COMB-003',
      tipo: 'Gasolina Aditivada',
      quantidade: 1200,
      unidade: 'L',
      localArmazenamento: 'Tanque 3',
      ultimaRecarga: '2025-06-12',
      estoqueMinimo: 400,
      status: 'Baixo Estoque'
    }
  ];

  // Mock data for fuel consumption (consumo de combustivel)
  consumoCombustivel = [
    {
      id: 1,
      codigoCombustivel: 'COMB-001',
      tipoCombustivel: 'Diesel',
      maquina: 'Trator John Deere 6110J',
      operacao: 'Preparo de Solo',
      quantidade: 120,
      unidade: 'L',
      data: '2025-06-08',
      operador: 'Carlos Silva'
    },
    {
      id: 2,
      codigoCombustivel: 'COMB-001',
      tipoCombustivel: 'Diesel',
      maquina: 'Colheitadeira New Holland TC5070',
      operacao: 'Colheita de Milho',
      quantidade: 200,
      unidade: 'L',
      data: '2025-06-10',
      operador: 'João Oliveira'
    },
    {
      id: 3,
      codigoCombustivel: 'COMB-002',
      tipoCombustivel: 'Gasolina Comum',
      maquina: 'Roçadeira Stihl FS 220',
      operacao: 'Manutenção de Cercas',
      quantidade: 15,
      unidade: 'L',
      data: '2025-06-11',
      operador: 'Pedro Santos'
    }
  ];

  // Mock data for oils and lubricants (oleos)
  oleos = [
    {
      id: 1,
      codigo: 'OL-001',
      nome: 'Óleo Hidráulico ISO 68',
      tipo: 'Hidráulico',
      quantidade: 400,
      unidade: 'L',
      localArmazenamento: 'Almoxarifado A',
      dataValidade: '2026-05-20',
      estoqueMinimo: 100,
      status: 'Disponível'
    },
    {
      id: 2,
      codigo: 'OL-002',
      nome: 'Óleo de Motor 15W40',
      tipo: 'Motor',
      quantidade: 250,
      unidade: 'L',
      localArmazenamento: 'Almoxarifado A',
      dataValidade: '2026-03-15',
      estoqueMinimo: 80,
      status: 'Disponível'
    },
    {
      id: 3,
      codigo: 'OL-003',
      nome: 'Óleo de Transmissão SAE 90',
      tipo: 'Caixa',
      quantidade: 60,
      unidade: 'L',
      localArmazenamento: 'Almoxarifado B',
      dataValidade: '2026-04-10',
      estoqueMinimo: 50,
      status: 'Baixo Estoque'
    },
    {
      id: 4,
      codigo: 'OL-004',
      nome: 'Graxa Multiuso NLGI 2',
      tipo: 'Graxa',
      quantidade: 45,
      unidade: 'kg',
      localArmazenamento: 'Almoxarifado B',
      dataValidade: '2026-07-25',
      estoqueMinimo: 40,
      status: 'Baixo Estoque'
    }
  ];

  // Form data for new fuel consumption
  novoConsumo = {
    codigoCombustivel: '',
    tipoCombustivel: '',
    maquina: '',
    operacao: '',
    quantidade: 0,
    unidade: 'L',
    data: '',
    operador: ''
  };

  // Show form flag
  showConsumoForm = false;

  // Method to change active tab
  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Method to toggle consumption form visibility
  toggleConsumoForm(): void {
    this.showConsumoForm = !this.showConsumoForm;
  }

  // Method to add new fuel consumption
  adicionarConsumo(): void {
    if (this.validarFormularioConsumo()) {
      const novoId = this.consumoCombustivel.length > 0 ? Math.max(...this.consumoCombustivel.map(c => c.id)) + 1 : 1;

      this.consumoCombustivel.push({
        id: novoId,
        codigoCombustivel: this.novoConsumo.codigoCombustivel,
        tipoCombustivel: this.novoConsumo.tipoCombustivel,
        maquina: this.novoConsumo.maquina,
        operacao: this.novoConsumo.operacao,
        quantidade: this.novoConsumo.quantidade,
        unidade: this.novoConsumo.unidade,
        data: this.novoConsumo.data,
        operador: this.novoConsumo.operador
      });

      // Update fuel quantity
      const combustivel = this.combustiveis.find(c => c.codigo === this.novoConsumo.codigoCombustivel);
      if (combustivel) {
        combustivel.quantidade -= this.novoConsumo.quantidade;

        // Update status if below minimum stock
        if (combustivel.quantidade <= combustivel.estoqueMinimo) {
          combustivel.status = 'Baixo Estoque';
        }
      }

      // Reset form
      this.novoConsumo = {
        codigoCombustivel: '',
        tipoCombustivel: '',
        maquina: '',
        operacao: '',
        quantidade: 0,
        unidade: 'L',
        data: '',
        operador: ''
      };

      this.showConsumoForm = false;
    }
  }

  // Method to validate consumption form
  validarFormularioConsumo(): boolean {
    return this.novoConsumo.codigoCombustivel !== '' &&
           this.novoConsumo.maquina !== '' &&
           this.novoConsumo.operacao !== '' &&
           this.novoConsumo.quantidade > 0 &&
           this.novoConsumo.data !== '' &&
           this.novoConsumo.operador !== '';
  }

  // Method to get fuel by code
  getCombustivelByCode(codigo: string): any {
    return this.combustiveis.find(c => c.codigo === codigo);
  }

  // Method to update fuel type based on selected code
  atualizarTipoCombustivel(): void {
    const combustivel = this.getCombustivelByCode(this.novoConsumo.codigoCombustivel);
    if (combustivel) {
      this.novoConsumo.tipoCombustivel = combustivel.tipo;
    }
  }

  // Method to check if item is below minimum stock
  isLowStock(item: any): boolean {
    return item.quantidade <= item.estoqueMinimo;
  }

  // Method to get count of items with low stock
  getLowStockCount(items: any[]): number {
    return items.filter(item => this.isLowStock(item)).length;
  }

  // Method to get total consumption by fuel type
  getTotalConsumptionByType(tipo: string): number {
    return this.consumoCombustivel
      .filter(consumo => consumo.tipoCombustivel === tipo)
      .reduce((total, consumo) => total + consumo.quantidade, 0);
  }

  // Method to get total consumption by machine
  getTotalConsumptionByMachine(maquina: string): number {
    return this.consumoCombustivel
      .filter(consumo => consumo.maquina === maquina)
      .reduce((total, consumo) => total + consumo.quantidade, 0);
  }
}
