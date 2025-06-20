import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'consultant';
  avatar?: string;
  farms?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Mock users for demonstration
  private mockUsers: User[] = [
    {
      id: 1,
      name: 'Administrador',
      email: 'admin@agrodata.com',
      role: 'admin',
      farms: [1, 2, 3]
    },
    {
      id: 2,
      name: 'Operador',
      email: 'operador@agrodata.com',
      role: 'operator',
      farms: [1]
    },
    {
      id: 3,
      name: 'Consultor',
      email: 'consultor@agrodata.com',
      role: 'consultant',
      farms: [1, 2]
    }
  ];

  constructor() {
    // Check if user is already logged in from localStorage
    this.checkAuthState();
  }

  /**
   * Get the current user as an observable
   */
  public currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  /**
   * Get the current user value
   */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get authentication state as an observable
   */
  public isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Get current authentication state
   */
  public get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Login with email and password
   * This is a mock implementation that simulates API call
   */
  public login(email: string, password: string): Observable<User> {
    // Find user by email (in a real app, this would be an API call)
    const user = this.mockUsers.find(u => u.email === email);

    // Simulate API delay
    return of(user || this.mockUsers[0]).pipe(
      delay(800), // Simulate network delay
      tap(user => {
        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Update subjects
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  /**
   * Logout the current user
   */
  public logout(): void {
    // Remove user from localStorage
    localStorage.removeItem('currentUser');

    // Update subjects
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Check if user has a specific role
   */
  public hasRole(role: 'admin' | 'operator' | 'consultant'): boolean {
    const user = this.currentUserValue;
    return user !== null && user.role === role;
  }

  /**
   * Check if user has access to a specific farm
   */
  public hasFarmAccess(farmId: number): boolean {
    const user = this.currentUserValue;
    return user !== null && user.farms !== undefined && user.farms.includes(farmId);
  }

  /**
   * Check authentication state from localStorage
   */
  private checkAuthState(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }
}
