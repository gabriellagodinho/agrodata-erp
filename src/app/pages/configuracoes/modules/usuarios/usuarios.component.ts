import { Component } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-usuarios',
  templateUrl: './usuarios.component.html',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./usuarios.component.scss']
})
export class ConfigUsuariosComponent {
  title = 'Configuração de Usuários';
  subtitle = 'Gerencie os usuários do sistema e suas permissões';

  // Mock data for users
  usuarios = [
    {
      id: 1,
      nome: 'João da Silva',
      email: 'joao.silva@agrodatafazendas.com.br',
      cargo: 'Administrador',
      departamento: 'TI',
      dataCadastro: '2024-05-10',
      ultimoAcesso: '2025-06-19 09:45',
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@agrodatafazendas.com.br',
      cargo: 'Gerente',
      departamento: 'Operações',
      dataCadastro: '2024-06-15',
      ultimoAcesso: '2025-06-18 16:30',
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      email: 'pedro.oliveira@agrodatafazendas.com.br',
      cargo: 'Técnico',
      departamento: 'Campo',
      dataCadastro: '2024-07-20',
      ultimoAcesso: '2025-06-15 14:22',
      status: 'Bloqueado'
    },
    {
      id: 4,
      nome: 'Ana Souza',
      email: 'ana.souza@agrodatafazendas.com.br',
      cargo: 'Analista',
      departamento: 'Financeiro',
      dataCadastro: '2024-08-05',
      ultimoAcesso: '2025-06-19 11:10',
      status: 'Ativo'
    },
    {
      id: 5,
      nome: 'Carlos Mendes',
      email: 'carlos.mendes@agrodatafazendas.com.br',
      cargo: 'Supervisor',
      departamento: 'Produção',
      dataCadastro: '2024-09-12',
      ultimoAcesso: '2025-06-17 08:45',
      status: 'Inativo'
    }
  ];

  // Form data for new user
  novoUsuario = {
    nome: '',
    email: '',
    cargo: '',
    departamento: '',
    senha: '',
    confirmarSenha: ''
  };

  // Toggle variables
  showUserForm = false;
  editMode = false;
  currentUserId = 0;

  // Method to toggle user form
  toggleUserForm(): void {
    this.showUserForm = !this.showUserForm;
    if (!this.showUserForm) {
      this.resetForm();
    }
  }

  // Method to reset form
  resetForm(): void {
    this.novoUsuario = {
      nome: '',
      email: '',
      cargo: '',
      departamento: '',
      senha: '',
      confirmarSenha: ''
    };
    this.editMode = false;
    this.currentUserId = 0;
  }

  // Method to validate form
  validarFormulario(): boolean {
    return this.novoUsuario.nome.trim() !== '' &&
           this.novoUsuario.email.trim() !== '' &&
           this.novoUsuario.cargo.trim() !== '' &&
           this.novoUsuario.departamento.trim() !== '' &&
           (this.editMode || (this.novoUsuario.senha.trim() !== '' &&
                             this.novoUsuario.senha === this.novoUsuario.confirmarSenha));
  }

  // Method to add new user
  adicionarUsuario(): void {
    if (this.validarFormulario()) {
      if (this.editMode) {
        // Update existing user
        const index = this.usuarios.findIndex(u => u.id === this.currentUserId);
        if (index !== -1) {
          this.usuarios[index] = {
            ...this.usuarios[index],
            nome: this.novoUsuario.nome,
            email: this.novoUsuario.email,
            cargo: this.novoUsuario.cargo,
            departamento: this.novoUsuario.departamento
          };
        }
      } else {
        // Add new user
        const novoId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
        const hoje = new Date().toISOString().split('T')[0];

        this.usuarios.push({
          id: novoId,
          nome: this.novoUsuario.nome,
          email: this.novoUsuario.email,
          cargo: this.novoUsuario.cargo,
          departamento: this.novoUsuario.departamento,
          dataCadastro: hoje,
          ultimoAcesso: 'Nunca',
          status: 'Ativo'
        });
      }

      this.resetForm();
      this.showUserForm = false;
    }
  }

  // Method to edit user
  editarUsuario(id: number): void {
    const usuario = this.usuarios.find(u => u.id === id);
    if (usuario) {
      this.novoUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
        departamento: usuario.departamento,
        senha: '',
        confirmarSenha: ''
      };
      this.editMode = true;
      this.currentUserId = id;
      this.showUserForm = true;
    }
  }

  // Method to change user status
  alterarStatus(id: number): void {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      const usuario = this.usuarios[index];
      if (usuario.status === 'Ativo') {
        usuario.status = 'Bloqueado';
      } else if (usuario.status === 'Bloqueado' || usuario.status === 'Inativo') {
        usuario.status = 'Ativo';
      }
    }
  }

  // Method to get status class
  getStatusClass(status: string): string {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Bloqueado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inativo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Method to count active users
  contarUsuariosAtivos(): number {
    return this.usuarios.filter(u => u.status === 'Ativo').length;
  }

  // Method to count blocked users
  contarUsuariosBloqueados(): number {
    return this.usuarios.filter(u => u.status === 'Bloqueado').length;
  }

  // Method to count inactive users
  contarUsuariosInativos(): number {
    return this.usuarios.filter(u => u.status === 'Inativo').length;
  }
}

export interface UsuariosComponent {
}
