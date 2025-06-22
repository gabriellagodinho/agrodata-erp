import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../../auth/auth.service';

interface ExtendedUser extends User {
  // Section 1: Personal Data
  fullName?: string;
  documentType?: 'cpf' | 'cnpj';
  documentNumber?: string;
  phone?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  profileImage?: string;

  // Section 2: Professional Data
  position?: string;
  department?: string;
  userType?: 'admin' | 'operational' | 'readonly';
  permissions?: string[];

  // Section 3: Agribusiness Connection
  associatedFarms?: string[];
  managedCrops?: string[];
  technicalResponsible?: boolean;

  // Section 4: Access Data
  username?: string;
  password?: string;
  accountStatus?: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  twoFactorAuth?: boolean;

  // Section 5: Location
  state?: string;
  city?: string;
  latitude?: number;
  longitude?: number;

  // Section 6: System Preferences
  theme?: 'light';
  language?: string;
  emailNotifications?: boolean;
  whatsappNotifications?: boolean;

  // Section 7: History and Audit
  creationDate?: string;
  createdBy?: string;
  lastUpdate?: string;
  recentActions?: {date: string, action: string, details: string}[];
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [NgIf, NgFor, NgClass, FormsModule],
  standalone: true
})
export class PerfilComponent implements OnInit {
  currentUser: ExtendedUser | null = null;
  isEditing = false;
  activeSection = 1; // Default to first section

  // Mock data for dropdowns
  states = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'];
  departments = ['Administrativo', 'Agricultura', 'Pecuária', 'Financeiro', 'Estoque', 'TI', 'Recursos Humanos', 'Comercial', 'Logística', 'Operacional'];
  modules = ['Agricultura', 'Pecuária', 'Financeiro', 'Estoque', 'BI', 'Comercialização', 'Recursos Humanos', 'Ambiental', 'Compliance', 'Configurações'];
  farms = ['Fazenda São João', 'Fazenda Boa Vista', 'Fazenda Esperança', 'Fazenda Santa Luzia', 'Fazenda Paraíso'];
  crops = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana-de-açúcar', 'Trigo', 'Feijão', 'Arroz', 'Gado de Corte', 'Gado Leiteiro'];

  // Form data for user profile
  userProfile: ExtendedUser = {
    id: 0,
    name: '',
    email: '',
    role: 'admin',

    // Section 1: Personal Data
    fullName: '',
    documentType: 'cpf',
    documentNumber: '',
    phone: '',
    birthDate: '',
    gender: 'prefer_not_to_say',
    profileImage: '',

    // Section 2: Professional Data
    position: '',
    department: '',
    userType: 'admin',
    permissions: [],

    // Section 3: Agribusiness Connection
    associatedFarms: [],
    managedCrops: [],
    technicalResponsible: false,

    // Section 4: Access Data
    username: '',
    password: '',
    accountStatus: 'active',
    lastLogin: '',
    twoFactorAuth: false,

    // Section 5: Location
    state: '',
    city: '',
    latitude: 0,
    longitude: 0,

    // Section 6: System Preferences
    theme: 'light',
    language: 'pt-BR',
    emailNotifications: true,
    whatsappNotifications: false,

    // Section 7: History and Audit
    creationDate: '',
    createdBy: '',
    lastUpdate: '',
    recentActions: []
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get the current user from the auth service
    this.authService.currentUser$().subscribe(user => {
      // Create a default user with fictional data for demonstration
      // This ensures the profile always has data, even if no user is logged in
      const defaultUser: User = user || {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@agrodata.com',
        role: 'admin',
        farms: [1, 2, 3]
      };

      // Create an extended user with mock data for the new fields
      this.currentUser = {
        ...defaultUser,
        fullName: defaultUser.name,
        documentType: 'cpf',
        documentNumber: '123.456.789-00',
        phone: '(11) 98765-4321',
        birthDate: '1990-01-01',
        gender: 'male',
        profileImage: '',

        position: 'Gerente de TI',
        department: 'TI',
        userType: 'admin',
        permissions: ['Agricultura', 'Pecuária', 'Financeiro', 'Estoque', 'BI', 'Comercialização'],

        associatedFarms: ['Fazenda São João', 'Fazenda Boa Vista', 'Fazenda Esperança'],
        managedCrops: ['Soja', 'Milho', 'Café', 'Algodão'],
        technicalResponsible: true,

        username: defaultUser.email.split('@')[0],
        password: '********',
        accountStatus: 'active',
        lastLogin: new Date().toISOString(),
        twoFactorAuth: true,

        state: 'São Paulo',
        city: 'Campinas',
        latitude: -22.9064,
        longitude: -47.0616,

        theme: 'light',
        language: 'pt-BR',
        emailNotifications: true,
        whatsappNotifications: true,

        creationDate: '2023-01-01',
        createdBy: 'Sistema',
        lastUpdate: '2023-06-15',
        recentActions: [
          {date: '2023-06-15 14:30', action: 'Login', details: 'Login bem-sucedido'},
          {date: '2023-06-14 09:15', action: 'Alteração de perfil', details: 'Atualização de e-mail'},
          {date: '2023-06-10 16:45', action: 'Login', details: 'Login bem-sucedido'},
          {date: '2023-06-05 11:20', action: 'Alteração de permissões', details: 'Adicionado acesso ao módulo Comercialização'},
          {date: '2023-05-28 08:45', action: 'Alteração de fazendas', details: 'Adicionada Fazenda Esperança'}
        ]
      };

      // Copy all fields to userProfile for editing
      this.userProfile = { ...this.currentUser };
    });
  }

  // Method to toggle edit mode
  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.currentUser) {
      // Reset form data if canceling edit
      this.userProfile = { ...this.currentUser };
    }
  }

  // Method to save profile changes
  saveProfile(): void {
    // In a real application, this would call an API to update the user profile
    // For now, we'll just update the local state
    if (this.currentUser) {
      this.currentUser = {
        ...this.currentUser,
        ...this.userProfile
      };

      // Add a new action to the recent actions list
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      if (!this.currentUser.recentActions) {
        this.currentUser.recentActions = [];
      }

      this.currentUser.recentActions.unshift({
        date: formattedDate,
        action: 'Alteração de perfil',
        details: 'Perfil atualizado pelo usuário'
      });

      // Update the last update date
      this.currentUser.lastUpdate = formattedDate;

      // Update the auth service (this is a simplified implementation)
      // In a real app, you would call an API and then update the auth service
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      // Exit edit mode
      this.isEditing = false;
    }
  }

  // Method to get role display name
  getRoleDisplayName(role: string): string {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'operator':
        return 'Operador';
      case 'consultant':
        return 'Consultor';
      default:
        return role;
    }
  }

  // Method to get gender display name
  getGenderDisplayName(gender: string | undefined): string {
    switch (gender) {
      case 'male':
        return 'Masculino';
      case 'female':
        return 'Feminino';
      case 'other':
        return 'Outro';
      case 'prefer_not_to_say':
        return 'Prefiro não dizer';
      default:
        return 'Não informado';
    }
  }

  // Method to get user type display name
  getUserTypeDisplayName(userType: string | undefined): string {
    switch (userType) {
      case 'admin':
        return 'Administrador';
      case 'operational':
        return 'Operacional';
      case 'readonly':
        return 'Leitura';
      default:
        return 'Não informado';
    }
  }

  // Method to get account status display name
  getAccountStatusDisplayName(status: string | undefined): string {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'suspended':
        return 'Suspenso';
      default:
        return 'Não informado';
    }
  }

  // Method to change active section
  changeSection(section: number): void {
    this.activeSection = section;
  }

  // Method to handle file upload for profile image
  handleProfileImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.userProfile.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to toggle a permission
  togglePermission(permission: string): void {
    if (!this.userProfile.permissions) {
      this.userProfile.permissions = [];
    }

    const index = this.userProfile.permissions.indexOf(permission);
    if (index === -1) {
      this.userProfile.permissions.push(permission);
    } else {
      this.userProfile.permissions.splice(index, 1);
    }
  }

  // Method to check if a permission is selected
  isPermissionSelected(permission: string): boolean {
    return this.userProfile.permissions?.includes(permission) || false;
  }

  // Method to toggle a farm
  toggleFarm(farm: string): void {
    if (!this.userProfile.associatedFarms) {
      this.userProfile.associatedFarms = [];
    }

    const index = this.userProfile.associatedFarms.indexOf(farm);
    if (index === -1) {
      this.userProfile.associatedFarms.push(farm);
    } else {
      this.userProfile.associatedFarms.splice(index, 1);
    }
  }

  // Method to check if a farm is selected
  isFarmSelected(farm: string): boolean {
    return this.userProfile.associatedFarms?.includes(farm) || false;
  }

  // Method to toggle a crop
  toggleCrop(crop: string): void {
    if (!this.userProfile.managedCrops) {
      this.userProfile.managedCrops = [];
    }

    const index = this.userProfile.managedCrops.indexOf(crop);
    if (index === -1) {
      this.userProfile.managedCrops.push(crop);
    } else {
      this.userProfile.managedCrops.splice(index, 1);
    }
  }

  // Method to check if a crop is selected
  isCropSelected(crop: string): boolean {
    return this.userProfile.managedCrops?.includes(crop) || false;
  }
}
