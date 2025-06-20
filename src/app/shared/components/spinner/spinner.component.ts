import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'light' | 'dark';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgClass],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'md';
  @Input() variant: SpinnerVariant = 'primary';
  @Input() fullScreen: boolean = false;
  @Input() overlay: boolean = false;
  @Input() label: string = 'Carregando...';
  @Input() showLabel: boolean = false;

  /**
   * Get spinner size classes
   */
  get sizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-10 h-10';
      case 'xl':
        return 'w-16 h-16';
      default: // md
        return 'w-8 h-8';
    }
  }

  /**
   * Get spinner color classes
   */
  get colorClasses(): string {
    switch (this.variant) {
      case 'secondary':
        return 'text-gray-600 dark:text-gray-300';
      case 'light':
        return 'text-white';
      case 'dark':
        return 'text-gray-800 dark:text-gray-200';
      default: // primary
        return 'text-primary-600 dark:text-primary-400';
    }
  }

  /**
   * Get container classes
   */
  get containerClasses(): string {
    const baseClasses = 'flex flex-col items-center justify-center';

    if (this.fullScreen) {
      return `${baseClasses} fixed inset-0 z-50 ${this.overlay ? 'bg-white/80 dark:bg-gray-900/80' : ''}`;
    }

    return baseClasses;
  }

  /**
   * Get label size classes
   */
  get labelSizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'text-xs mt-1';
      case 'lg':
        return 'text-base mt-3';
      case 'xl':
        return 'text-lg mt-4';
      default: // md
        return 'text-sm mt-2';
    }
  }
}
