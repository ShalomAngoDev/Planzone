import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from '../../../core/services/event.service';
import { BookingService } from '../../../core/services/booking.service';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  eventStats = {
    total: 0,
    upcoming: 0,
    past: 0
  };

  bookingStats = {
    total: 0,
    confirmed: 0,
    cancelled: 0
  };

  userStats = {
    total: 0,
    admins: 0,
    users: 0
  };

  constructor(
    private eventService: EventService,
    private bookingService: BookingService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    console.log('Admin dashboard initialized');
    this.loadStats();
  }

  loadStats(): void {
    // Pour l'instant, utilisons des données fictives

    this.eventStats = {
      total: 24,
      upcoming: 18,
      past: 6
    };

    this.bookingStats = {
      total: 136,
      confirmed: 112,
      cancelled: 24
    };

    this.userStats = {
      total: 85,
      admins: 3,
      users: 82
    };



  }
}
