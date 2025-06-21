import { Component } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent {
  title = 'Integração com Sensores';
  subtitle = 'Monitoramento e gestão de sensores IoT e dispositivos conectados';

  // Mock data for sensors
  activeTab = 'dispositivos'; // 'dispositivos', 'leituras', 'alertas', 'configuracoes'

  // Mock data for devices
  dispositivos = [
    {
      id: 1,
      nome: 'Estação Meteorológica Principal',
      tipo: 'Estação Meteorológica',
      fabricante: 'AgroTech',
      modelo: 'WeatherPro 3000',
      localizacao: 'Sede da Fazenda',
      coordenadas: '-23.5505, -46.6333',
      dataInstalacao: '2024-08-15',
      ultimaManutencao: '2025-04-10',
      status: 'Ativo',
      bateria: 92
    },
    {
      id: 2,
      nome: 'Sensor de Umidade do Solo - Talhão 1',
      tipo: 'Sensor de Umidade',
      fabricante: 'SoilTech',
      modelo: 'HydroSense 200',
      localizacao: 'Talhão 1 - Soja',
      coordenadas: '-23.5605, -46.6433',
      dataInstalacao: '2024-09-20',
      ultimaManutencao: '2025-03-15',
      status: 'Ativo',
      bateria: 78
    },
    {
      id: 3,
      nome: 'Sensor de Umidade do Solo - Talhão 2',
      tipo: 'Sensor de Umidade',
      fabricante: 'SoilTech',
      modelo: 'HydroSense 200',
      localizacao: 'Talhão 2 - Milho',
      coordenadas: '-23.5705, -46.6533',
      dataInstalacao: '2024-09-20',
      ultimaManutencao: '2025-03-15',
      status: 'Manutenção',
      bateria: 45
    },
    {
      id: 4,
      nome: 'Estação Meteorológica Secundária',
      tipo: 'Estação Meteorológica',
      fabricante: 'AgroTech',
      modelo: 'WeatherPro 2000',
      localizacao: 'Área Norte',
      coordenadas: '-23.5405, -46.6233',
      dataInstalacao: '2024-10-05',
      ultimaManutencao: '2025-04-10',
      status: 'Ativo',
      bateria: 85
    },
    {
      id: 5,
      nome: 'Sensor de Irrigação - Pivô Central',
      tipo: 'Sensor de Irrigação',
      fabricante: 'IrrigaTech',
      modelo: 'FlowControl X1',
      localizacao: 'Pivô Central - Área Leste',
      coordenadas: '-23.5805, -46.6133',
      dataInstalacao: '2024-11-10',
      ultimaManutencao: '2025-05-05',
      status: 'Inativo',
      bateria: 0
    }
  ];

  // Mock data for sensor readings
  leituras = [
    {
      id: 1,
      dispositivo: 'Estação Meteorológica Principal',
      tipo: 'Temperatura',
      valor: 28.5,
      unidade: '°C',
      dataHora: '2025-06-19 14:30:00',
      status: 'Normal'
    },
    {
      id: 2,
      dispositivo: 'Estação Meteorológica Principal',
      tipo: 'Umidade do Ar',
      valor: 65,
      unidade: '%',
      dataHora: '2025-06-19 14:30:00',
      status: 'Normal'
    },
    {
      id: 3,
      dispositivo: 'Estação Meteorológica Principal',
      tipo: 'Velocidade do Vento',
      valor: 12,
      unidade: 'km/h',
      dataHora: '2025-06-19 14:30:00',
      status: 'Normal'
    },
    {
      id: 4,
      dispositivo: 'Sensor de Umidade do Solo - Talhão 1',
      tipo: 'Umidade do Solo',
      valor: 35,
      unidade: '%',
      dataHora: '2025-06-19 14:15:00',
      status: 'Alerta'
    },
    {
      id: 5,
      dispositivo: 'Sensor de Umidade do Solo - Talhão 2',
      tipo: 'Umidade do Solo',
      valor: 42,
      unidade: '%',
      dataHora: '2025-06-19 14:15:00',
      status: 'Normal'
    },
    {
      id: 6,
      dispositivo: 'Estação Meteorológica Secundária',
      tipo: 'Temperatura',
      valor: 27.8,
      unidade: '°C',
      dataHora: '2025-06-19 14:30:00',
      status: 'Normal'
    },
    {
      id: 7,
      dispositivo: 'Estação Meteorológica Secundária',
      tipo: 'Precipitação',
      valor: 0,
      unidade: 'mm',
      dataHora: '2025-06-19 14:30:00',
      status: 'Normal'
    }
  ];

  // Mock data for alerts
  alertas = [
    {
      id: 1,
      dispositivo: 'Sensor de Umidade do Solo - Talhão 1',
      tipo: 'Umidade Baixa',
      mensagem: 'Umidade do solo abaixo do limite recomendado (35%)',
      dataHora: '2025-06-19 14:15:00',
      nivel: 'Médio',
      status: 'Não resolvido'
    },
    {
      id: 2,
      dispositivo: 'Sensor de Umidade do Solo - Talhão 2',
      tipo: 'Bateria Baixa',
      mensagem: 'Nível de bateria abaixo de 50% (45%)',
      dataHora: '2025-06-19 10:30:00',
      nivel: 'Baixo',
      status: 'Não resolvido'
    },
    {
      id: 3,
      dispositivo: 'Sensor de Irrigação - Pivô Central',
      tipo: 'Dispositivo Offline',
      mensagem: 'Dispositivo não responde há mais de 24 horas',
      dataHora: '2025-06-18 08:45:00',
      nivel: 'Alto',
      status: 'Não resolvido'
    },
    {
      id: 4,
      dispositivo: 'Estação Meteorológica Principal',
      tipo: 'Temperatura Alta',
      mensagem: 'Temperatura acima de 35°C por mais de 3 horas',
      dataHora: '2025-06-17 15:20:00',
      nivel: 'Médio',
      status: 'Resolvido'
    },
    {
      id: 5,
      dispositivo: 'Estação Meteorológica Secundária',
      tipo: 'Erro de Comunicação',
      mensagem: 'Falha na transmissão de dados',
      dataHora: '2025-06-16 11:10:00',
      nivel: 'Baixo',
      status: 'Resolvido'
    }
  ];

  // Method to change active tab
  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Method to get device status class
  getDeviceStatusClass(status: string): string {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Manutenção':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inativo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to get battery level class
  getBatteryLevelClass(level: number): string {
    if (level > 70) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  // Method to get reading status class
  getReadingStatusClass(status: string): string {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Alerta':
        return 'bg-yellow-100 text-yellow-800';
      case 'Crítico':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to get alert level class
  getAlertLevelClass(nivel: string): string {
    switch (nivel) {
      case 'Baixo':
        return 'bg-blue-100 text-blue-800';
      case 'Médio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Alto':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to get alert status class
  getAlertStatusClass(status: string): string {
    switch (status) {
      case 'Resolvido':
        return 'bg-green-100 text-green-800';
      case 'Não resolvido':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to calculate battery percentage width
  getBatteryWidth(level: number): string {
    return `${level}%`;
  }

  // Method to get active devices count
  getActiveDevicesCount(): number {
    return this.dispositivos.filter(d => d.status === 'Ativo').length;
  }

  // Method to get maintenance devices count
  getMaintenanceDevicesCount(): number {
    return this.dispositivos.filter(d => d.status === 'Manutenção').length;
  }

  // Method to get inactive devices count
  getInactiveDevicesCount(): number {
    return this.dispositivos.filter(d => d.status === 'Inativo').length;
  }

  // Method to get unresolved alerts count
  getUnresolvedAlertsCount(): number {
    return this.alertas.filter(a => a.status === 'Não resolvido').length;
  }

  // Method to get high priority alerts count
  getHighPriorityAlertsCount(): number {
    return this.alertas.filter(a => a.nivel === 'Alto' && a.status === 'Não resolvido').length;
  }
}
