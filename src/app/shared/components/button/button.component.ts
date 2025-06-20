import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() rounded: boolean = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.inline-block')
  get isInlineBlock(): boolean {
    return !this.fullWidth;
  }

  @HostBinding('class.block')
  @HostBinding('class.w-full')
  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  /**
   * Get button classes based on variant and size
   */
  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
    const roundedClasses = this.rounded ? 'rounded-full' : 'rounded-lg';

    // Size classes
    let sizeClasses = '';
    switch (this.size) {
      case 'sm':
        sizeClasses = 'px-3 py-1.5 text-xs';
        break;
      case 'lg':
        sizeClasses = 'px-6 py-3 text-base';
        break;
      default: // md
        sizeClasses = 'px-4 py-2 text-sm';
    }

    // Variant classes
    let variantClasses = '';
    switch (this.variant) {
      case 'primary':
        variantClasses = 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800';
        break;
      case 'secondary':
        variantClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200';
        break;
      case 'danger':
        variantClasses = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800';
        break;
      case 'success':
        variantClasses = 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 dark:bg-green-700 dark:hover:bg-green-800';
        break;
      case 'warning':
        variantClasses = 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700';
        break;
      case 'info':
        variantClasses = 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700';
        break;
      case 'light':
        variantClasses = 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-100';
        break;
      case 'dark':
        variantClasses = 'bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800';
        break;
    }

    // Disabled classes
    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `${baseClasses} ${roundedClasses} ${sizeClasses} ${variantClasses} ${disabledClasses}`;
  }

  /**
   * Handle button click
   */
  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
