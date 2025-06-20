import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

export interface DropdownItem {
  id: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() buttonClass: string = 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600';
  @Input() placement: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left';
  @Input() width: string = 'w-48';
  @Input() disabled: boolean = false;

  @Output() itemSelected = new EventEmitter<DropdownItem>();

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  /**
   * Toggle dropdown visibility
   */
  toggleDropdown(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  }

  /**
   * Close dropdown when clicking outside
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  /**
   * Close dropdown when escape key is pressed
   */
  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    this.isOpen = false;
  }

  /**
   * Handle item selection
   */
  onItemClick(item: DropdownItem): void {
    if (item.disabled || item.divider) return;

    this.itemSelected.emit(item);
    this.isOpen = false;
  }

  /**
   * Get dropdown menu placement classes
   */
  get placementClasses(): string {
    switch (this.placement) {
      case 'bottom-right':
        return 'origin-top-right right-0';
      case 'top-left':
        return 'origin-bottom-left bottom-full mb-1';
      case 'top-right':
        return 'origin-bottom-right right-0 bottom-full mb-1';
      default: // bottom-left
        return 'origin-top-left left-0';
    }
  }

  /**
   * Get icon path for dropdown item
   */
  getIconPath(icon: string): string {
    // Common icons used in dropdowns
    switch (icon) {
      case 'edit':
        return 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z';
      case 'delete':
        return 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16';
      case 'view':
        return 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z';
      case 'download':
        return 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4';
      case 'upload':
        return 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12';
      case 'settings':
        return 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z';
      case 'logout':
        return 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1';
      case 'user':
        return 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z';
      case 'chevron-down':
        return 'M19 9l-7 7-7-7';
      default:
        return icon;
    }
  }
}
