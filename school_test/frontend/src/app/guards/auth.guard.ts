import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

/**
 * Authentication Guard Service
 * Protects routes based on authentication state and user roles
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  /**
   * Determines if a route can be activated
   * @param route The route being activated
   * @returns Boolean indicating if navigation is permitted
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Authentication verification
    const userToken = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // Redirect unauthenticated users
    if (!userToken) {
      this.router.navigate(['/login']);
      return false;
    }

    // Role-based access control
    const requiredRole = route.data['role'];
    if (requiredRole && requiredRole !== userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    // User is authenticated and authorized
    return true;
  }
}