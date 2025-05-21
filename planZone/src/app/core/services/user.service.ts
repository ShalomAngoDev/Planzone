import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  updateProfile(userId: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  changePassword(userId: string, passwordData: {currentPassword: string, newPassword: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/password`, passwordData);
  }
}