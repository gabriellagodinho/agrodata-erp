import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);

  constructor() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setDarkMode(savedTheme === 'dark');
    } else {
      // Check if user prefers dark mode at OS level
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(prefersDark);
    }

    // Listen for changes in OS theme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.setDarkMode(e.matches);
      }
    });
  }

  /**
   * Get the current dark mode state
   */
  isDarkMode$(): Observable<boolean> {
    return this.isDarkMode.asObservable();
  }

  /**
   * Get the current dark mode value
   */
  isDarkModeValue(): boolean {
    return this.isDarkMode.value;
  }

  /**
   * Set dark mode state
   */
  setDarkMode(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  /**
   * Toggle between light and dark mode
   */
  toggleDarkMode(): void {
    this.setDarkMode(!this.isDarkMode.value);
  }
}
