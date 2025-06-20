import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {ObservableInput, Subscription, takeUntil } from 'rxjs';
import { Toast, ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription = new Subscription();
  private destroy$!: ObservableInput<any>;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToasts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        'next': (toasts: Toast[]) => this.toasts = toasts,
        error: (err: any) => console.error('Error fetching toasts:', err)
      });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Remove a toast
   */
  removeToast(id: string): void {
    this.toastService.remove(id);
  }

  /**
   * Get icon for toast type
   */
  getIcon(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'M5 13l4 4L19 7';
      case 'error':
        return 'M6 18L18 6M6 6l12 12';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
      case 'info':
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      default:
        return '';
    }
  }

  /**
   * Get background color class for toast type
   */
  getBackgroundClass(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800';
    }
  }

  /**
   * Get icon color class for toast type
   */
  getIconClass(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'text-green-500 dark:text-green-400';
      case 'error':
        return 'text-red-500 dark:text-red-400';
      case 'warning':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'info':
        return 'text-blue-500 dark:text-blue-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  }

  /**
   * Get title color class for toast type
   */
  getTitleClass(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  }

  /**
   * Get message color class for toast type
   */
  getMessageClass(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'text-green-700 dark:text-green-300';
      case 'error':
        return 'text-red-700 dark:text-red-300';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'info':
        return 'text-blue-700 dark:text-blue-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  }
}
