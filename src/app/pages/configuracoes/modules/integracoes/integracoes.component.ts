import { Component } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NovaIntegracao {
  nome: string;
  tipo: string;
  descricao: string;
  apiKey: string;
  endpoint: string;
  intervaloAtualizacao: number;
  parametrosAdicionais: string;
}


// Extracted constants for reusability
const DEFAULT_JSON_FORMAT = 'json';
const DEFAULT_SINCRONIZACAO = 'Nunca';
const DEFAULT_ATUALIZACAO_INTERVAL = 60;

// Interfaces for better type safety and readability
interface Integracao {
    id: number;
    nome: string;
    tipo: string;
    descricao: string;
    status: boolean;
    ultimaSincronizacao: string;
    configuracao: any;
}

interface NovaIntegracao {
    nome: string;
    tipo: string;
    descricao: string;
    apiKey: string;
    endpoint: string;
    intervaloAtualizacao: number;
    parametrosAdicionais: string;
}

@Component({
    selector: 'app-integracoes',
    templateUrl: './integracoes.component.html',
    imports: [NgClass, NgIf, NgFor, FormsModule],
    styleUrls: ['./integracoes.component.scss']
})
export class IntegracoesComponent {
    id: number | undefined;
  configuracao: any;
  status: boolean | undefined;
    formatJSON(configuracao: any) {
      this.configuracao = configuracao;
      throw new Error('Method not implemented.');
    }
    adicionarIntegracaoDisponivel(id: number) {
      this.id = id;
      throw new Error('Method not implemented.');
    }
    testarIntegracao(id: number) {
      this.id = id;
      throw new Error('Method not implemented.');
    }
    toggleStatus(id: number) {
      this.id = id;
      throw new Error('Method not implemented.');
    }
    title = 'Integrações';
    subtitle = 'Gerencie as integrações do sistema com serviços externos e APIs';

    integracoes: Integracao[] = [
        {
            id: 1,
            nome: 'API Clima',
            tipo: 'API Externa',
            descricao: 'Integração com serviço de previsão do tempo',
            status: true,
            ultimaSincronizacao: '2025-06-18 14:30:00',
            configuracao: {
                apiKey: 'a1b2c3d4e5f6g7h8i9j0',
                endpoint: 'https://api.clima.com/v1',
                intervaloAtualizacao: 60,
                parametros: {formato: DEFAULT_JSON_FORMAT, unidades: 'metric'}
            }
        },
        {
            id: 2,
            nome: 'Sistema ERP Financeiro',
            tipo: 'Sistema Interno',
            descricao: 'Integração com o sistema financeiro da empresa',
            status: true,
            ultimaSincronizacao: '2025-06-18 12:15:00',
            configuracao: {
                servidor: 'erp-financeiro.interno',
                porta: 8080,
                usuario: 'integracao_agrodata',
                autenticacao: 'token',
                sincronizacaoAutomatica: true
            }
        },
        {
            id: 3,
            nome: 'Bolsa de Valores Agrícolas',
            tipo: 'API Externa',
            descricao: 'Cotações de commodities agrícolas em tempo real',
            status: true,
            ultimaSincronizacao: '2025-06-18 15:45:00',
            configuracao: {
                apiKey: 'xyz123456789',
                endpoint: 'https://api.bolsaagricola.com/v2',
                intervaloAtualizacao: 15,
                parametros: {produtos: ['soja', 'milho', 'cafe', 'algodao'], formato: DEFAULT_JSON_FORMAT}
            }
        }
    ];

    integracoesDisponiveis: Integracao[] = [
        {
            id: 101,
            nome: 'Serviço de Imagens de Satélite',
            tipo: 'API Externa',
            descricao: 'Imagens de satélite para monitoramento de lavouras',
            status: false,
            ultimaSincronizacao: DEFAULT_SINCRONIZACAO,
            configuracao: {}
        }
    ];

    novaIntegracao: NovaIntegracao = this.createNovaIntegracao();

    activeTab = 'ativas';
    showIntegracaoForm = false;
    selectedIntegracao: Integracao | null = null;
    showApiKeyField = false;

    changeTab(tab: string): void {
        this.activeTab = tab;
    }

    toggleIntegracaoForm(): void {
        this.showIntegracaoForm = !this.showIntegracaoForm;
        if (!this.showIntegracaoForm) this.resetForm();
    }

    resetForm(): void {
        this.novaIntegracao = this.createNovaIntegracao();
    }

    createNovaIntegracao(): NovaIntegracao {
        return {
            nome: '',
            tipo: '',
            descricao: '',
            apiKey: '',
            endpoint: '',
            intervaloAtualizacao: DEFAULT_ATUALIZACAO_INTERVAL,
            parametrosAdicionais: ''
        };
    }

    validarFormulario(): boolean {
        const {nome, tipo, endpoint} = this.novaIntegracao;
        return !!(nome && tipo && endpoint);
    }

    adicionarIntegracao(): void {
        if (!this.validarFormulario()) return;
        this.integracoes.push(this.buildIntegracao());
        this.toggleIntegracaoForm(); // Fecha o formulário após adicionar
    }

    buildIntegracao(): Integracao {
        const {
            nome,
            tipo,
            descricao,
            apiKey,
            endpoint,
            intervaloAtualizacao,
            parametrosAdicionais
        } = this.novaIntegracao;
        return {
            id: Date.now(),
            nome,
            tipo,
            descricao: descricao || '',
            status: true,
            ultimaSincronizacao: DEFAULT_SINCRONIZACAO,
            configuracao: {
                apiKey: apiKey || '',
                endpoint: endpoint || '',
                intervaloAtualizacao: intervaloAtualizacao || DEFAULT_ATUALIZACAO_INTERVAL,
                parametros: {formato: DEFAULT_JSON_FORMAT, ...JSON.parse(parametrosAdicionais || '{}')}
            }
        };
    }

    selecionarIntegracao(integracao: Integracao): void {
        this.selectedIntegracao = integracao;
        this.changeTab('configuracao');
    }

    sincronizarIntegracao(id: number): void {
        const integracao = this.integracoes.find(i => i.id === id);
        if (integracao) {
            integracao.ultimaSincronizacao = new Date().toISOString().replace('T', ' ').substring(0, 19);
            alert(`Sincronização concluída para: ${integracao.nome}`);
        }
    }

    toggleApiKeyVisibility(): void {
        this.showApiKeyField = !this.showApiKeyField;
    }

  contarIntegracoesAtivas() {
    return "";
  }

  getStatusClass(status: boolean) {
    this.status = status;
    return undefined;
  }
}
