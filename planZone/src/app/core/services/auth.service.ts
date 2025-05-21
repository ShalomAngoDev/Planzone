import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private storageService = inject(StorageService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Initialiser uniquement si nous sommes dans un navigateur
    if (this.isBrowser) {
      this.isAuthenticatedSubject.next(this.hasValidToken());
      this.loadUser();
    }
  }

  register(registerData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }

  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(tap(response => this.handleAuthentication(response)));
  }

  logout(): void {
    this.storageService.removeItem('auth_token');
    this.storageService.removeItem('user_data');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.storageService.getItem('auth_token');
  }

  isAdmin(): boolean {
    const userData = this.getCurrentUser();
    return userData?.role === 'ROLE_ADMIN';
  }

  private handleAuthentication(authResponse: AuthResponse): void {
    this.storageService.setItem('auth_token', authResponse.token);
    
    const user: User = {
      id: authResponse.userId,
      username: authResponse.username,
      email: '', // L'API ne retourne pas l'email
      role: authResponse.role
    };
    
    this.storageService.setItem('user_data', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private loadUser(): void {
    const userData = this.storageService.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData) as User;
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private hasValidToken(): boolean {
    return !!this.storageService.getItem('auth_token');
  }
}