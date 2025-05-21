import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AdminStats {
  events: {
    total: number;
    upcoming: number;
    past: number;
  };
  bookings: {
    total: number;
    confirmed: number;
    cancelled: number;
  };
  users: {
    total: number;
    admins: number;
    users: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.apiUrl}/stats`);
  }
}