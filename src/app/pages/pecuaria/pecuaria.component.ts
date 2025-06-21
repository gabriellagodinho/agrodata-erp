import { Component } from '@angular/core';
import {NgClass, NgIf, NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pecuaria',
  templateUrl: './pecuaria.component.html',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./pecuaria.component.scss']
})
export class PecuariaComponent {
  title = 'Pecuária';
  subtitle = 'Gestão de rebanhos, produção de leite e corte';

  // Mock data for cattle
  activeTab = 'leite'; // 'leite', 'corte', 'cria', 'giro', 'hotel'

  // Mock data for milk production
  rebanhoLeite = [
    {
      id: 1,
      identificacao: 'BOV-001',
      nome: 'Mimosa',
      raca: 'Holandesa',
      idade: 4,
      status: 'Produção',
      producaoMedia: 28.5,
      ultimaOrdenha: '2025-06-18',
      imagem: 'assets/images/vaca1.jpg'
    },
    {
      id: 2,
      identificacao: 'BOV-002',
      nome: 'Malhada',
      raca: 'Jersey',
      idade: 3,
      status: 'Produção',
      producaoMedia: 22.3,
      ultimaOrdenha: '2025-06-18',
      imagem: 'assets/images/vaca2.jpg'
    },
    {
      id: 3,
      identificacao: 'BOV-003',
      nome: 'Estrela',
      raca: 'Gir Leiteiro',
      idade: 5,
      status: 'Gestação',
      producaoMedia: 0,
      ultimaOrdenha: '2025-05-10',
      imagem: 'assets/images/vaca3.jpg'
    }
  ];

  // Mock data for beef cattle
  rebanhoCorte = [
    {
      id: 1,
      identificacao: 'BOV-101',
      raca: 'Nelore',
      idade: 2.5,
      peso: 480,
      status: 'Engorda',
      previsaoAbate: '2025-09-15',
      lote: 'L-2023-01'
    },
    {
      id: 2,
      identificacao: 'BOV-102',
      raca: 'Angus',
      idade: 2.2,
      peso: 520,
      status: 'Engorda',
      previsaoAbate: '2025-08-20',
      lote: 'L-2023-01'
    },
    {
      id: 3,
      identificacao: 'BOV-103',
      raca: 'Brahman',
      idade: 1.8,
      peso: 410,
      status: 'Crescimento',
      previsaoAbate: '2025-12-10',
      lote: 'L-2023-02'
    }
  ];

  // Mock data for breeding
  rebanhoCria = [
    {
      id: 1,
      identificacao: 'BOV-201',
      tipo: 'Matriz',
      raca: 'Nelore',
      idade: 6,
      status: 'Gestação',
      dataCobertura: '2025-02-10',
      previsaoParto: '2025-11-20',
      numeroPartos: 3
    },
    {
      id: 2,
      identificacao: 'BOV-202',
      tipo: 'Matriz',
      raca: 'Nelore',
      idade: 4,
      status: 'Vazia',
      dataCobertura: '',
      previsaoParto: '',
      numeroPartos: 1
    },
    {
      id: 3,
      identificacao: 'BOV-301',
      tipo: 'Reprodutor',
      raca: 'Nelore',
      idade: 5,
      status: 'Ativo',
      dataCobertura: '',
      previsaoParto: '',
      numeroPartos: 0
    }
  ];

  // Mock data for cattle rotation (giro de gado)
  giroGado = [
    {
      id: 1,
      lote: 'L-2023-01',
      ano: 2023,
      entradas: 50,
      saidas: 35,
      motivoSaida: 'Venda',
      saldoFinal: 15,
      valorMedio: 3200
    },
    {
      id: 2,
      lote: 'L-2023-02',
      ano: 2023,
      entradas: 30,
      saidas: 10,
      motivoSaida: 'Transferência',
      saldoFinal: 20,
      valorMedio: 2800
    },
    {
      id: 3,
      lote: 'L-2024-01',
      ano: 2024,
      entradas: 45,
      saidas: 20,
      motivoSaida: 'Venda',
      saldoFinal: 25,
      valorMedio: 3500
    },
    {
      id: 4,
      lote: 'L-2024-02',
      ano: 2024,
      entradas: 35,
      saidas: 0,
      motivoSaida: '',
      saldoFinal: 35,
      valorMedio: 3800
    }
  ];

  // Mock data for hotel operation (bois de terceiros)
  boisHotel = [
    {
      id: 1,
      proprietario: 'João Silva',
      quantidade: 25,
      dataEntrada: '2025-03-15',
      dataSaida: '2025-09-15',
      valorDiario: 12.50,
      observacoes: 'Raça Nelore, peso médio 450kg'
    },
    {
      id: 2,
      proprietario: 'Fazenda São Pedro',
      quantidade: 40,
      dataEntrada: '2025-04-10',
      dataSaida: '2025-10-10',
      valorDiario: 15.00,
      observacoes: 'Raça Angus, peso médio 500kg'
    },
    {
      id: 3,
      proprietario: 'Carlos Mendes',
      quantidade: 15,
      dataEntrada: '2025-05-20',
      dataSaida: '2025-08-20',
      valorDiario: 13.75,
      observacoes: 'Raça Brahman, tratamento especial'
    }
  ];

  // Form data for new hotel cattle
  novoHotel = {
    proprietario: '',
    quantidade: 0,
    dataEntrada: '',
    dataSaida: '',
    valorDiario: 0,
    observacoes: ''
  };

  // Filter variables
  anoFiltro: number = new Date().getFullYear();
  showHotelForm = false;

  // Method to change active tab
  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Method to add new hotel cattle
  adicionarBoiHotel(): void {
    if (this.validarFormularioHotel()) {
      const novoId = this.boisHotel.length > 0 ? Math.max(...this.boisHotel.map(b => b.id)) + 1 : 1;

      this.boisHotel.push({
        id: novoId,
        proprietario: this.novoHotel.proprietario,
        quantidade: this.novoHotel.quantidade,
        dataEntrada: this.novoHotel.dataEntrada,
        dataSaida: this.novoHotel.dataSaida,
        valorDiario: this.novoHotel.valorDiario,
        observacoes: this.novoHotel.observacoes
      });

      // Reset form
      this.novoHotel = {
        proprietario: '',
        quantidade: 0,
        dataEntrada: '',
        dataSaida: '',
        valorDiario: 0,
        observacoes: ''
      };

      this.showHotelForm = false;
    }
  }

  // Method to validate hotel form
  validarFormularioHotel(): boolean {
    return this.novoHotel.proprietario.trim() !== '' &&
           this.novoHotel.quantidade > 0 &&
           this.novoHotel.dataEntrada !== '' &&
           this.novoHotel.dataSaida !== '' &&
           this.novoHotel.valorDiario > 0;
  }

  // Method to toggle hotel form visibility
  toggleHotelForm(): void {
    this.showHotelForm = !this.showHotelForm;
  }

  // Method to filter giro by year
  filtrarGiroPorAno(ano: number): any[] {
    return this.giroGado.filter(giro => giro.ano === ano);
  }

  // Method to calculate total entries for a year
  calcularTotalEntradas(ano: number): number {
    return this.filtrarGiroPorAno(ano).reduce((sum, giro) => sum + giro.entradas, 0);
  }

  // Method to calculate total exits for a year
  calcularTotalSaidas(ano: number): number {
    return this.filtrarGiroPorAno(ano).reduce((sum, giro) => sum + giro.saidas, 0);
  }

  // Method to get total cattle count (farm owned + hotel)
  getTotalCattle(): number {
    const farmCattle = this.rebanhoLeite.length + this.rebanhoCorte.length + this.rebanhoCria.length;
    const hotelCattle = this.boisHotel.reduce((total, hotel) => total + hotel.quantidade, 0);
    return farmCattle + hotelCattle;
  }

  // Method to get farm owned cattle count
  getFarmCattle(): number {
    return this.rebanhoLeite.length + this.rebanhoCorte.length + this.rebanhoCria.length;
  }

  // Method to get hotel cattle count
  getHotelCattle(): number {
    return this.boisHotel.reduce((total, hotel) => total + hotel.quantidade, 0);
  }

  // Method to format number as currency
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }

  // Method to calculate daily revenue from hotel cattle
  calcularReceitaDiaria(): number {
    return this.boisHotel.reduce((sum, hotel) => sum + (hotel.quantidade * hotel.valorDiario), 0);
  }

  // Method to calculate monthly value for a hotel entry
  calcularValorMensal(quantidade: number, valorDiario: number): number {
    return quantidade * valorDiario * 30;
  }
}
