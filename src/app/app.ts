import {Component} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { DropdownComponent, DropdownItem } from './shared/components/dropdown/dropdown.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BreadcrumbComponent, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'agrodata-erp';
  protected sidebarOpen = false;
  protected userDropdownOpen = false;

  protected userMenuItems: DropdownItem[] = [
    {
      id: 'profile',
      label: 'Meu Perfil',
      icon: 'user'
    },
    {
      id: 'logout',
      label: 'Sair',
      icon: 'logout',
      danger: true
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Toggle sidebar visibility for mobile view
   */
  protected toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Toggle user dropdown menu
   */
  protected toggleUserDropdown(): void {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  /**
   * Handle user menu item selection
   */
  protected onUserMenuItemSelected(item: DropdownItem): void {
    if (item.id === 'profile') {
      this.router.navigate(['/perfil']);
    } else if (item.id === 'logout') {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
