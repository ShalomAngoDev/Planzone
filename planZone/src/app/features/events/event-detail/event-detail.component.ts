import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventService } from '../../../core/services/event.service';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { EventModel } from '../../../core/models/event.model';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: EventModel | null = null;
  loading = true;
  numberOfSeats = 1;
  isBooking = false;
  bookingSuccess = false;
  bookingError = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private bookingService: BookingService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        this.loadEvent(eventId);
      } else {
        this.router.navigate(['/events']);
      }
    });
  }

  loadEvent(id: string): void {
    this.loading = true;
    this.eventService.getEvent(id).subscribe({
      next: (event) => {
        this.event = event;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading event details', error);
        this.loading = false;
      }
    });
  }

  bookEvent(): void {
    if (!this.event || !this.numberOfSeats || this.isBooking) {
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.isBooking = true;
    this.bookingSuccess = false;
    this.bookingError = '';

    const booking: Booking = {
      userId: currentUser.id!,
      eventId: this.event.id!,
      numberOfSeats: this.numberOfSeats
    };

    this.bookingService.createBooking(booking).subscribe({
      next: () => {
        this.isBooking = false;
        this.bookingSuccess = true;
        // Optionally reload the event to get updated seat counts
        if (this.event?.id) {
          this.loadEvent(this.event.id);
        }
      },
      error: (error) => {
        this.isBooking = false;
        this.bookingError = error.error?.message || 'Une erreur est survenue lors de la réservation.';
      }
    });
  }
}