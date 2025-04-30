import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { // ✅ Ensure class-based guard
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const user = this.authService.getCurrentUser();

    if (user && user.role === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
