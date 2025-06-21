import {Component} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BreadcrumbComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'agrodata-erp';
  protected sidebarOpen = false;

  constructor() {}

  /**
   * Toggle sidebar visibility for mobile view
   */
  protected toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
