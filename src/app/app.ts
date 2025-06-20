import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, BreadcrumbComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'agrodata-erp';
  protected sidebarOpen = false;
  protected isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialize dark mode state
    this.isDarkMode = this.themeService.isDarkModeValue();

    // Subscribe to dark mode changes
    this.themeService.isDarkMode$().subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  /**
   * Toggle sidebar visibility for mobile view
   */
  protected toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Toggle dark/light mode
   */
  protected toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}
