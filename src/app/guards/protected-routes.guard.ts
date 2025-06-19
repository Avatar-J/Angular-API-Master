import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const protectedRoutesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated;
  const router = inject(Router);
  if (!isAuthenticated) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
