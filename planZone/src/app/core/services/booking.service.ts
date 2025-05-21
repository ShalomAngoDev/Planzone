import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/bookings'; // Vérifiez que cette URL est correcte

  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<Booking> {
    // Logs de débogage
    console.log('Creating booking with data:', booking);
    
    // Créer explicitement des en-têtes
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    
    // Envoi avec options explicites
    return this.http.post<Booking>(this.apiUrl, booking, { headers })
      .pipe(
        tap(response => console.log('Booking successful:', response)),
        catchError(this.handleError)
      );
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  cancelBooking(bookingId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookingId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error details:', error);
    return throwError(() => error);
  }
}