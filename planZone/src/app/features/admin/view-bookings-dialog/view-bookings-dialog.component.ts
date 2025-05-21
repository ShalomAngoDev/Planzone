import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

interface DialogData {
  eventId: string;
  eventTitle: string;
}

@Component({
  selector: 'app-view-bookings-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  template: `
    <h2 mat-dialog-title>Réservations pour {{ data.eventTitle }}</h2>
    <mat-dialog-content>
      <div class="loading-container" *ngIf="loading">
        <mat-spinner diameter="30"></mat-spinner>
      </div>
      
      <div class="no-bookings" *ngIf="!loading && bookings.length === 0">
        <p>Aucune réservation pour cet événement.</p>
      </div>
      
      <div class="bookings-list" *ngIf="!loading && bookings.length > 0">
        <table mat-table [dataSource]="bookings" class="bookings-table">
          <!-- User Column -->
          <ng-container matColumnDef="user">
            <th mat-header-cell *matHeaderCellDef>Utilisateur</th>
            <td mat-cell *matCellDef="let booking">{{ booking.userId }}</td>
          </ng-container>
          
          <!-- Seats Column -->
          <ng-container matColumnDef="seats">
            <th mat-header-cell *matHeaderCellDef>Places</th>
            <td mat-cell *matCellDef="let booking">{{ booking.numberOfSeats }}</td>
          </ng-container>
          
          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let booking">{{ booking.bookingDate | date:'dd/MM/yyyy' }}</td>
          </ng-container>
          
          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Statut</th>
            <td mat-cell *matCellDef="let booking">
              <span [ngClass]="getStatusClass(booking.status)">{{ getStatusLabel(booking.status) }}</span>
            </td>
          </ng-container>
          
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fermer</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
    
    .bookings-table {
      width: 100%;
    }
    
    .status-confirmed {
      color: #4caf50;
      font-weight: 500;
    }
    
    .status-pending {
      color: #ff9800;
      font-weight: 500;
    }
    
    .status-cancelled {
      color: #f44336;
      font-weight: 500;
    }
  `]
})
export class ViewBookingsDialogComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  displayedColumns: string[] = ['user', 'seats', 'date', 'status'];

  constructor(
    public dialogRef: MatDialogRef<ViewBookingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadEventBookings();
  }

  loadEventBookings(): void {
    // Ici, vous devrez implémenter un service pour récupérer les réservations d'un événement
    // Pour l'instant, utilisons des données fictives
    
    setTimeout(() => {
      this.bookings = [
        {
          id: '123456789',
          userId: 'user123',
          eventId: this.data.eventId,
          numberOfSeats: 2,
          bookingDate: new Date().toISOString(),
          status: 'CONFIRMED'
        },
        {
          id: '987654321',
          userId: 'user456',
          eventId: this.data.eventId,
          numberOfSeats: 1,
          bookingDate: new Date().toISOString(),
          status: 'CANCELLED'
        }
      ];
      this.loading = false;
    }, 1000);
  }

  getStatusLabel(status: string | undefined): string {
    if (!status) return 'Inconnu';
    
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

  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    
    switch (status) {
      case 'CONFIRMED':
        return 'status-confirmed';
      case 'PENDING':
        return 'status-pending';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return '';
    }
  }
}