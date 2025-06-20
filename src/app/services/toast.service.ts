import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  title?: string;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);

  /**
   * Get all active toasts
   */
  getToasts(): Observable<Toast[]> {
    return this.toasts.asObservable();
  }

  /**
   * Show a success toast
   */
  success(message: string, title?: string, duration: number = 5000): string {
    return this.show({
      message,
      title,
      type: 'success',
      duration,
      autoClose: true
    });
  }

  /**
   * Show an error toast
   */
  error(message: string, title?: string, duration: number = 0): string {
    return this.show({
      message,
      title,
      type: 'error',
      duration,
      autoClose: duration > 0
    });
  }

  /**
   * Show a warning toast
   */
  warning(message: string, title?: string, duration: number = 7000): string {
    return this.show({
      message,
      title,
      type: 'warning',
      duration,
      autoClose: true
    });
  }

  /**
   * Show an info toast
   */
  info(message: string, title?: string, duration: number = 5000): string {
    return this.show({
      message,
      title,
      type: 'info',
      duration,
      autoClose: true
    });
  }

  /**
   * Show a custom toast
   */
  show(toast: Omit<Toast, 'id'>): string {
    const id = this.generateId();
    const newToast: Toast = {
      id,
      ...toast
    };

    const currentToasts = this.toasts.value;
    this.toasts.next([...currentToasts, newToast]);

    if (newToast.autoClose && newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, newToast.duration);
    }

    return id;
  }

  /**
   * Remove a toast by id
   */
  remove(id: string): void {
    const currentToasts = this.toasts.value;
    this.toasts.next(currentToasts.filter(toast => toast.id !== id));
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toasts.next([]);
  }

  /**
   * Generate a unique ID for a toast
   */
  private generateId(): string {
    return 'toast-' + Math.random().toString(36).substr(2, 9);
  }
}
