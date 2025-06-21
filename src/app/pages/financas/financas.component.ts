import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-financas',
  templateUrl: './financas.component.html',
  imports: [
    NgClass,
    NgIf
  ],
  styleUrls: ['./financas.component.scss']
})
export class FinancasComponent {
  title = 'Finanças';

  // Active view: 'geral', 'fiscal', 'real', 'comparativo'
  activeView = 'geral';

  // Period selection
  activePeriod = 'mes';

  // Mock data for fiscal costs
  custosFiscais = {
    insumos: 120000,
    maodeobra: 85000,
    maquinario: 45000,
    servicos: 35000,
    impostos: 25000,
    outros: 10000,
    total: 320000
  };

  // Mock data for real production costs
  custosReais = {
    insumos: 120000,
    maodeobra: 110000, // Includes family labor
    maquinario: 65000, // Includes internal maintenance
    servicos: 35000,
    impostos: 25000,
    aberturaAreas: 40000, // Not in fiscal costs
    manutencaoInterna: 20000, // Not in fiscal costs
    outros: 15000,
    total: 430000
  };

  // Mock data for cost comparison by category
  comparativoCustos = [
    { categoria: 'Insumos', fiscal: 120000, real: 120000, diferenca: 0 },
    { categoria: 'Mão de Obra', fiscal: 85000, real: 110000, diferenca: 25000 },
    { categoria: 'Maquinário', fiscal: 45000, real: 65000, diferenca: 20000 },
    { categoria: 'Serviços', fiscal: 35000, real: 35000, diferenca: 0 },
    { categoria: 'Impostos', fiscal: 25000, real: 25000, diferenca: 0 },
    { categoria: 'Abertura de Áreas', fiscal: 0, real: 40000, diferenca: 40000 },
    { categoria: 'Manutenção Interna', fiscal: 0, real: 20000, diferenca: 20000 },
    { categoria: 'Outros', fiscal: 10000, real: 15000, diferenca: 5000 },
    { categoria: 'Total', fiscal: 320000, real: 430000, diferenca: 110000 }
  ];

  // Method to change active view
  changeView(view: string): void {
    this.activeView = view;
  }

  // Method to change active period
  changePeriod(period: string): void {
    this.activePeriod = period;
  }

  // Method to format currency
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Method to calculate percentage difference
  calculatePercentageDiff(fiscal: number, real: number): number {
    if (fiscal === 0) return 100;
    return ((real - fiscal) / fiscal) * 100;
  }
}
