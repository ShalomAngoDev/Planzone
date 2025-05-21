import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      console.log('Admin guard - isAuthenticated:', isAuthenticated);
      console.log('Admin guard - isAdmin:', authService.isAdmin());

      if (isAuthenticated && authService.isAdmin()) {
        return true;
      } else {
        console.log('Admin guard - redirecting to /events');
        router.navigate(['/events']);
        return false;
      }
    })
  );
};
