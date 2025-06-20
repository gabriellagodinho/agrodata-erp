import { Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-propriedades',
  templateUrl: './propriedades.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./propriedades.component.scss']
})
export class PropriedadesComponent {
  title = 'Propriedades Rurais';

  // Mock data for properties
  propriedades = [
    {
      id: 1,
      nome: 'Fazenda São João',
      area: 1200,
      unidade: 'hectares',
      localizacao: 'Ribeirão Preto, SP',
      status: 'Ativa',
      culturas: ['Soja', 'Milho', 'Café'],
      imagem: 'assets/images/fazenda1.jpg'
    },
    {
      id: 2,
      nome: 'Sítio Boa Esperança',
      area: 45,
      unidade: 'hectares',
      localizacao: 'Campinas, SP',
      status: 'Ativa',
      culturas: ['Hortaliças', 'Frutas'],
      imagem: 'assets/images/fazenda2.jpg'
    },
    {
      id: 3,
      nome: 'Fazenda Santa Luzia',
      area: 850,
      unidade: 'hectares',
      localizacao: 'Uberaba, MG',
      status: 'Em manutenção',
      culturas: ['Soja', 'Algodão'],
      imagem: 'assets/images/fazenda3.jpg'
    }
  ];
}
