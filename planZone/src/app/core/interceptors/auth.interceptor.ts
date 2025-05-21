import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

// Modifiez auth.interceptor.ts pour afficher plus d'informations de débogage
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  console.log('Interceptor - URL:', req.url);
  console.log('Interceptor - Token exists:', !!token);
  
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    // Afficher les en-têtes pour vérifier qu'ils sont bien définis
    console.log('Request headers:', cloned.headers.keys());
    
    return next(cloned);
  }
  
  return next(req);
};