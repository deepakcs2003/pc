import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user has the expected role', () => {
    authService.getCurrentUser.and.returnValue({ role: 'admin' });
    const route: any = { data: { expectedRole: 'admin' } };
    expect(guard.canActivate(route, {} as any)).toBeTrue();
  });

  it('should redirect to login if user does not have the expected role', () => {
    authService.getCurrentUser.and.returnValue({ role: 'student' });
    const route: any = { data: { expectedRole: 'admin' } };
    
    expect(guard.canActivate(route, {} as any)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
