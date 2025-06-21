import { Component } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./compliance.component.scss']
})
export class ComplianceComponent {
  title = 'Compliance e Documentação';
  subtitle = 'Gestão de documentos, licenças e conformidade legal';

  // Active tab
  activeTab = 'documentos'; // 'documentos', 'licencas', 'auditorias', 'relatorios'

  // Mock data for documents
  documentos = [
    {
      id: 1,
      nome: 'Contrato de Arrendamento',
      tipo: 'Contrato',
      dataEmissao: '2025-01-15',
      dataValidade: '2030-01-15',
      status: 'Vigente',
      responsavel: 'Jurídico',
      arquivo: 'contrato_arrendamento.pdf',
      observacoes: 'Contrato de arrendamento da Fazenda São João'
    },
    {
      id: 2,
      nome: 'Escritura de Propriedade',
      tipo: 'Escritura',
      dataEmissao: '2020-05-10',
      dataValidade: null,
      status: 'Permanente',
      responsavel: 'Jurídico',
      arquivo: 'escritura_propriedade.pdf',
      observacoes: 'Escritura registrada em cartório'
    },
    {
      id: 3,
      nome: 'Certificado de Cadastro de Imóvel Rural (CCIR)',
      tipo: 'Certificado',
      dataEmissao: '2024-03-20',
      dataValidade: '2026-03-20',
      status: 'Vigente',
      responsavel: 'Administrativo',
      arquivo: 'ccir_2024.pdf',
      observacoes: 'CCIR emitido pelo INCRA'
    },
    {
      id: 4,
      nome: 'Imposto Territorial Rural (ITR)',
      tipo: 'Imposto',
      dataEmissao: '2024-09-15',
      dataValidade: '2025-09-15',
      status: 'Vigente',
      responsavel: 'Financeiro',
      arquivo: 'itr_2024.pdf',
      observacoes: 'Comprovante de pagamento do ITR'
    }
  ];

  // Mock data for licenses
  licencas = [
    {
      id: 1,
      nome: 'Licença Ambiental de Operação',
      orgaoEmissor: 'Secretaria Estadual de Meio Ambiente',
      numero: 'LA-2024-12345',
      dataEmissao: '2024-02-10',
      dataValidade: '2026-02-10',
      status: 'Vigente',
      responsavel: 'Ambiental',
      arquivo: 'licenca_ambiental.pdf',
      observacoes: 'Licença para operação da propriedade rural'
    },
    {
      id: 2,
      nome: 'Outorga de Uso de Recursos Hídricos',
      orgaoEmissor: 'Agência Nacional de Águas',
      numero: 'OUT-2023-7890',
      dataEmissao: '2023-06-15',
      dataValidade: '2028-06-15',
      status: 'Vigente',
      responsavel: 'Ambiental',
      arquivo: 'outorga_agua.pdf',
      observacoes: 'Outorga para captação de água para irrigação'
    },
    {
      id: 3,
      nome: 'Cadastro Ambiental Rural (CAR)',
      orgaoEmissor: 'SICAR',
      numero: 'CAR-12345678',
      dataEmissao: '2022-04-20',
      dataValidade: null,
      status: 'Ativo',
      responsavel: 'Ambiental',
      arquivo: 'car.pdf',
      observacoes: 'Cadastro Ambiental Rural da propriedade'
    },
    {
      id: 4,
      nome: 'Certificado de Regularidade do IBAMA',
      orgaoEmissor: 'IBAMA',
      numero: 'CR-2024-5678',
      dataEmissao: '2024-01-05',
      dataValidade: '2025-01-05',
      status: 'Vigente',
      responsavel: 'Ambiental',
      arquivo: 'certificado_ibama.pdf',
      observacoes: 'Certificado de regularidade junto ao IBAMA'
    }
  ];

  // Mock data for audits
  auditorias = [
    {
      id: 1,
      tipo: 'Interna',
      area: 'Ambiental',
      dataInicio: '2025-03-10',
      dataFim: '2025-03-15',
      status: 'Concluída',
      responsavel: 'Maria Santos',
      resultado: 'Conforme',
      observacoes: 'Auditoria interna de conformidade ambiental'
    },
    {
      id: 2,
      tipo: 'Externa',
      area: 'Trabalhista',
      dataInicio: '2025-04-05',
      dataFim: '2025-04-07',
      status: 'Concluída',
      responsavel: 'Consultoria ABC',
      resultado: 'Não Conforme',
      observacoes: 'Auditoria externa de conformidade trabalhista. Encontradas 3 não conformidades.'
    },
    {
      id: 3,
      tipo: 'Interna',
      area: 'Fiscal',
      dataInicio: '2025-05-20',
      dataFim: '2025-05-22',
      status: 'Planejada',
      responsavel: 'Carlos Mendes',
      resultado: 'Pendente',
      observacoes: 'Auditoria interna de conformidade fiscal'
    },
    {
      id: 4,
      tipo: 'Certificação',
      area: 'Produção Sustentável',
      dataInicio: '2025-06-10',
      dataFim: '2025-06-15',
      status: 'Planejada',
      responsavel: 'Certificadora XYZ',
      resultado: 'Pendente',
      observacoes: 'Auditoria para certificação de produção sustentável'
    }
  ];

  // Mock data for reports
  relatorios = [
    {
      id: 1,
      nome: 'Relatório Anual de Atividades',
      tipo: 'Anual',
      dataEmissao: '2024-12-15',
      periodo: '2024',
      destinatario: 'Secretaria de Agricultura',
      status: 'Enviado',
      arquivo: 'relatorio_anual_2024.pdf',
      observacoes: 'Relatório anual de atividades agrícolas'
    },
    {
      id: 2,
      nome: 'Relatório de Monitoramento Ambiental',
      tipo: 'Semestral',
      dataEmissao: '2025-01-20',
      periodo: '2º Semestre 2024',
      destinatario: 'Órgão Ambiental',
      status: 'Enviado',
      arquivo: 'relatorio_ambiental_2s2024.pdf',
      observacoes: 'Relatório semestral de monitoramento ambiental'
    },
    {
      id: 3,
      nome: 'Relatório de Uso de Recursos Hídricos',
      tipo: 'Anual',
      dataEmissao: '2025-02-10',
      periodo: '2024',
      destinatario: 'Agência Nacional de Águas',
      status: 'Enviado',
      arquivo: 'relatorio_recursos_hidricos_2024.pdf',
      observacoes: 'Relatório anual de uso de recursos hídricos'
    },
    {
      id: 4,
      nome: 'Relatório de Conformidade Trabalhista',
      tipo: 'Trimestral',
      dataEmissao: '2025-04-05',
      periodo: '1º Trimestre 2025',
      destinatario: 'Interno',
      status: 'Em elaboração',
      arquivo: 'relatorio_trabalhista_1t2025.pdf',
      observacoes: 'Relatório trimestral de conformidade trabalhista'
    }
  ];

  // Form data for new document
  novoDocumento = {
    nome: '',
    tipo: '',
    dataEmissao: '',
    dataValidade: '',
    responsavel: '',
    observacoes: ''
  };

  showDocumentoForm = false;

  // Method to change active tab
  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Method to toggle document form visibility
  toggleDocumentoForm(): void {
    this.showDocumentoForm = !this.showDocumentoForm;
  }

  // Method to add new document
  adicionarDocumento(): void {
    if (this.validarFormularioDocumento()) {
      const novoId = this.documentos.length > 0 ? Math.max(...this.documentos.map(d => d.id)) + 1 : 1;

      this.documentos.push({
        id: novoId,
        nome: this.novoDocumento.nome,
        tipo: this.novoDocumento.tipo,
        dataEmissao: this.novoDocumento.dataEmissao,
        dataValidade: this.novoDocumento.dataValidade || null,
        status: this.determinarStatus(this.novoDocumento.dataValidade),
        responsavel: this.novoDocumento.responsavel,
        arquivo: 'novo_documento.pdf',
        observacoes: this.novoDocumento.observacoes
      });

      // Reset form
      this.novoDocumento = {
        nome: '',
        tipo: '',
        dataEmissao: '',
        dataValidade: '',
        responsavel: '',
        observacoes: ''
      };

      this.showDocumentoForm = false;
    }
  }

  // Method to validate document form
  validarFormularioDocumento(): boolean {
    return this.novoDocumento.nome.trim() !== '' &&
           this.novoDocumento.tipo.trim() !== '' &&
           this.novoDocumento.dataEmissao !== '' &&
           this.novoDocumento.responsavel.trim() !== '';
  }

  // Method to determine document status based on validity date
  determinarStatus(dataValidade: string): string {
    if (!dataValidade) {
      return 'Permanente';
    }

    const hoje = new Date();
    const validade = new Date(dataValidade);

    if (validade < hoje) {
      return 'Vencido';
    } else {
      return 'Vigente';
    }
  }

  // Method to get status class
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'vigente':
      case 'ativo':
      case 'conforme':
      case 'enviado':
        return 'bg-green-100 text-green-800';
      case 'vencido':
      case 'não conforme':
        return 'bg-red-100 text-red-800';
      case 'a vencer':
      case 'em elaboração':
      case 'planejada':
        return 'bg-yellow-100 text-yellow-800';
      case 'permanente':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to count documents by status
  contarDocumentosPorStatus(status: string): number {
    return this.documentos.filter(doc => doc.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Method to count licenses by status
  contarLicencasPorStatus(status: string): number {
    return this.licencas.filter(lic => lic.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Method to count audits by status
  contarAuditoriasPorStatus(status: string): number {
    return this.auditorias.filter(aud => aud.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Method to count reports by status
  contarRelatoriosPorStatus(status: string): number {
    return this.relatorios.filter(rel => rel.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Method to check if a document is about to expire (within 30 days)
  isDocumentoAVencer(dataValidade: string | null): boolean {
    if (!dataValidade) return false;

    const hoje = new Date();
    const validade = new Date(dataValidade);
    const diffTime = validade.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 && diffDays <= 30;
  }
}
