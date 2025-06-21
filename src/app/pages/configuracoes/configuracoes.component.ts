import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { IntegracoesComponent } from './modules/integracoes/integracoes.component';
import {ConfigNotificacoesComponent} from './modules/notificacoes/notificacoes.component';
import {ConfigUsuariosComponent} from './modules/usuarios/usuarios.component';

@Component({
  imports: [
    NgIf,
    IntegracoesComponent,
    ConfigNotificacoesComponent,
    ConfigUsuariosComponent
  ],
  selector: 'app-configuracoes',
  standalone: true,
  styleUrls: ['./configuracoes.component.scss'],
  templateUrl: './configuracoes.component.html'
})
export class ConfiguracoesComponent {
  title = 'Configurações';
  activeModule = 'empresa'; // Default active module

  // Method to change the active module
  changeModule(module: string): void {
    this.activeModule = module;
  }
}
