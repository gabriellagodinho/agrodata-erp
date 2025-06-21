import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);

  constructor() {
    // Always use light mode
    localStorage.setItem('theme', 'light');

    // Ensure dark mode class is removed from document
    document.documentElement.classList.remove('dark');
  }

  /**
   * Get the current dark mode state (always false)
   */
  isDarkMode$(): Observable<boolean> {
    return this.isDarkMode.asObservable();
  }

  /**
   * Get the current dark mode value (always false)
   */
  isDarkModeValue(): boolean {
    return false;
  }

  /**
   * Set dark mode state (no-op, always sets to light mode)
   */
  setDarkMode(isDark: boolean): void {
    // Always use light mode regardless of input
    this.isDarkMode.next(false);
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  }

  /**
   * Toggle between light and dark mode (no-op, always stays in light mode)
   */
  toggleDarkMode(): void {
    // No-op, always stay in light mode
    this.setDarkMode(false);
  }
}
