import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, NgIf, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() showCloseButton: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() closeOnClickOutside: boolean = true;
  @Input() size: ModalSize = 'md';
  @Input() isOpen: boolean = false;
  @Input() hideFooter: boolean = false;
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmVariant: 'primary' | 'danger' | 'success' = 'primary';
  @Input() loading: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalContent') modalContent!: ElementRef;

  /**
   * Close modal when escape key is pressed
   */
  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isOpen && this.closeOnEscape) {
      this.onClose();
    }
  }

  /**
   * Close modal when clicking outside
   */
  @HostListener('click', ['$event'])
  onBackdropClick(event: MouseEvent): void {
    if (this.isOpen && this.closeOnClickOutside && event.target === event.currentTarget) {
      this.onClose();
    }
  }

  /**
   * Get modal size classes
   */
  get sizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'max-w-md';
      case 'lg':
        return 'max-w-3xl';
      case 'xl':
        return 'max-w-5xl';
      case 'full':
        return 'max-w-full m-4';
      default: // md
        return 'max-w-xl';
    }
  }

  /**
   * Handle confirm button click
   */
  onConfirm(): void {
    this.confirm.emit();
  }

  /**
   * Handle cancel button click
   */
  onCancel(): void {
    this.cancel.emit();
    this.onClose();
  }

  /**
   * Handle close button click
   */
  onClose(): void {
    this.close.emit();
  }

  /**
   * Open the modal
   */
  open(): void {
    this.isOpen = true;
    document.body.classList.add('overflow-hidden');

    // Focus the first focusable element inside the modal
    setTimeout(() => {
      const focusableElements = this.modalContent.nativeElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    });
  }

  /**
   * Close the modal
   */
  closeModal(): void {
    this.isOpen = false;
    document.body.classList.remove('overflow-hidden');
  }
}
