import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking } from '../../../core/models/booking.model';
import { CancelBookingDialogComponent } from '../cancel-booking-dialog/cancel-booking-dialog.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.id) {
      this.loading = false;
      return;
    }

    this.loading = true;
    this.bookingService.getUserBookings(currentUser.id).subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings', error);
        this.loading = false;
      }
    });
  }

  openCancelDialog(booking: Booking): void {
    const dialogRef = this.dialog.open(CancelBookingDialogComponent, {
      width: '400px',
      data: {
        booking: booking
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelBooking(booking.id!);
      }
    });
  }

  cancelBooking(bookingId: string): void {
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        // Mettre à jour localement l'état de la réservation
        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
          this.bookings[bookingIndex].status = 'CANCELLED';
        }
      },
      error: (error) => {
        console.error('Error cancelling booking', error);
      }
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmé';
      case 'PENDING':
        return 'En attente';
      case 'CANCELLED':
        return 'Annulé';
      default:
        return status;
    }
  }

  isEventPassed(eventDate: string | undefined): boolean {
    if (!eventDate) return false;
    const eventTime = new Date(eventDate).getTime();
    const currentTime = new Date().getTime();
    return eventTime < currentTime;
  }
}