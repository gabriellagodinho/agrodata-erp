import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-pecuaria',
  templateUrl: './pecuaria.component.html',
  imports: [
    NgClass,
    NgIf
  ],
  styleUrls: ['./pecuaria.component.scss']
})
export class PecuariaComponent {
  title = 'Pecuária';
  subtitle = 'Gestão de rebanhos, produção de leite e corte';

  // Mock data for cattle
  activeTab = 'leite'; // 'leite', 'corte', 'cria'

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

  // Method to change active tab
  changeTab(tab: string): void {
    this.activeTab = tab;
  }
}
