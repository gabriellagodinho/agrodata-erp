import { Component } from '@angular/core';
import {NgClass, NgIf, NgFor, NgForOf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-notificacoes',
  templateUrl: './notificacoes.component.html',
  imports: [
    NgClass,
    FormsModule
  ],
  styleUrls: ['./notificacoes.component.scss']
})
export class ConfigNotificacoesComponent {
  tipo: any;
  testarEmail() {
      throw new Error('Method not implemented.');
  }
  title = 'Configuração de Notificações';
  subtitle = 'Gerencie as preferências de notificações do sistema';

  // Mock data for notification types
  tiposNotificacao = [
    {
      id: 1,
      nome: 'Alertas do Sistema',
      descricao: 'Notificações sobre atualizações, manutenções e eventos do sistema',
      email: true,
      sistema: true,
      mobile: true,
      sms: false,
      prioridade: 'Alta'
    },
    {
      id: 2,
      nome: 'Tarefas Atribuídas',
      descricao: 'Notificações quando uma nova tarefa for atribuída a você',
      email: true,
      sistema: true,
      mobile: true,
      sms: false,
      prioridade: 'Alta'
    },
    {
      id: 3,
      nome: 'Lembretes de Vencimentos',
      descricao: 'Notificações sobre documentos, licenças ou certificados próximos do vencimento',
      email: true,
      sistema: true,
      mobile: false,
      sms: true,
      prioridade: 'Média'
    },
    {
      id: 4,
      nome: 'Alertas de Sensores',
      descricao: 'Notificações sobre leituras anormais de sensores e equipamentos',
      email: true,
      sistema: true,
      mobile: true,
      sms: true,
      prioridade: 'Alta'
    },
    {
      id: 5,
      nome: 'Atualizações de Preços',
      descricao: 'Notificações sobre mudanças nos preços de commodities e insumos',
      email: true,
      sistema: true,
      mobile: false,
      sms: false,
      prioridade: 'Baixa'
    },
    {
      id: 6,
      nome: 'Relatórios Gerados',
      descricao: 'Notificações quando novos relatórios forem gerados',
      email: true,
      sistema: true,
      mobile: false,
      sms: false,
      prioridade: 'Média'
    },
    {
      id: 7,
      nome: 'Previsão do Tempo',
      descricao: 'Alertas sobre condições climáticas relevantes para a operação',
      email: false,
      sistema: true,
      mobile: true,
      sms: true,
      prioridade: 'Alta'
    }
  ];

  // Mock data for notification channels
  canaisNotificacao = [
    {
      id: 1,
      tipo: 'Email',
      ativo: true,
      destinatarios: 'admin@agrodatafazendas.com.br, gerente@agrodatafazendas.com.br',
      configuracao: 'Imediato'
    },
    {
      id: 2,
      tipo: 'Sistema',
      ativo: true,
      destinatarios: 'Todos os usuários ativos',
      configuracao: 'Imediato'
    },
    {
      id: 3,
      tipo: 'Aplicativo Móvel',
      ativo: true,
      destinatarios: 'Usuários com app instalado',
      configuracao: 'Imediato'
    },
    {
      id: 4,
      tipo: 'SMS',
      ativo: false,
      destinatarios: '+55 11 98765-4321, +55 11 91234-5678',
      configuracao: 'Apenas alta prioridade'
    }
  ];

  // Form data for email settings
  emailSettings = {
    servidor: 'smtp.agrodatafazendas.com.br',
    porta: 587,
    usuario: 'notificacoes@agrodatafazendas.com.br',
    senha: '********',
    ssl: true,
    remetente: 'AgroData ERP <notificacoes@agrodatafazendas.com.br>',
    assunto: '[AgroData ERP] Nova Notificação: {tipo}',
    criptografia: undefined,
    autenticacao: undefined
  };

  // Form data for mobile settings
  mobileSettings = {
    pushNotifications: true,
    inAppNotifications: true,
    badgeCount: true,
    sound: true,
    vibration: true,
    notificacoesOffline: undefined,
    fcmKey: undefined,
    packageId: undefined,
    vibracoes: undefined,
    sons: undefined
  };

  // Toggle variables
  showEmailSettings = false;
  showMobileSettings = false;

  // Method to toggle email settings
  toggleEmailSettings(): void {
    this.showEmailSettings = !this.showEmailSettings;
    if (this.showEmailSettings) {
      this.showMobileSettings = false;
    }
  }

  // Method to toggle mobile settings
  toggleMobileSettings(): void {
    this.showMobileSettings = !this.showMobileSettings;
    if (this.showMobileSettings) {
      this.showEmailSettings = false;
    }
  }

  // Method to toggle notification channel
  toggleCanal(id: number): void {
    const canal = this.canaisNotificacao.find(c => c.id === id);
    if (canal) {
      canal.ativo = !canal.ativo;
    }
  }

  // Method to toggle notification type setting
  toggleNotificacaoSetting(id: number, tipo: 'email' | 'sistema' | 'mobile' | 'sms'): void {
    const notificacao = this.tiposNotificacao.find(n => n.id === id);
    if (notificacao) {
      notificacao[tipo] = !notificacao[tipo];
    }
  }

  // Method to get priority class
  getPriorityClass(prioridade: string): string {
    switch (prioridade) {
      case 'Alta':
        return 'bg-red-100 text-red-800';
      case 'Média':
        return 'bg-yellow-100 text-yellow-800';
      case 'Baixa':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to get status class
  getStatusClass(ativo: boolean): string {
    return ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  }

  // Method to count active channels
  contarCanaisAtivos(): number {
    return this.canaisNotificacao.filter(c => c.ativo).length;
  }

  // Method to save email settings
  salvarEmailSettings(): void {
    // In a real application, this would save to a backend
    this.showEmailSettings = false;
    // Show success message
    alert('Configurações de e-mail salvas com sucesso!');
  }

  // Method to save mobile settings
  salvarMobileSettings(): void {
    // In a real application, this would save to a backend
    this.showMobileSettings = false;
    // Show success message
    alert('Configurações de aplicativo móvel salvas com sucesso!');
  }

  // Method to test email notification
  testarEmailNotificacao(): void {
    // In a real application, this would send a test email
    alert('E-mail de teste enviado com sucesso!');
  }

  testarNotificacaoMobile() {

  }
}

export interface NotificacoesComponent {
}
