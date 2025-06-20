import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if user is authenticated
    if (this.authService.isAuthenticated) {
      // Check if route has role requirements
      const requiredRole = route.data['requiredRole'] as 'admin' | 'operator' | 'consultant' | undefined;

      // If no role is required or user has the required role, allow access
      if (!requiredRole || this.authService.hasRole(requiredRole)) {
        return true;
      }

      // If user doesn't have the required role, redirect to dashboard
      return this.router.createUrlTree(['/dashboard']);
    }

    // If not authenticated, redirect to login page with return url
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  /**
   * Helper method to check if user can access a specific farm
   * Can be used in components to conditionally show/hide elements
   */
  canAccessFarm(farmId: number): boolean {
    return this.authService.hasFarmAccess(farmId);
  }
}
