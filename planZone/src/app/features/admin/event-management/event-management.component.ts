import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventService } from '../../../core/services/event.service';
import { EventModel } from '../../../core/models/event.model';
import { DeleteEventDialogComponent } from '../delete-event-dialog/delete-event-dialog.component';
import { ViewBookingsDialogComponent } from '../view-bookings-dialog/view-bookings-dialog.component';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent implements OnInit {
  events: EventModel[] = [];
  filteredEvents: EventModel[] = [];
  loading = true;
  searchTerm = '';
  filterStatus = 'all';
  
  displayedColumns: string[] = ['id', 'image', 'title', 'date', 'location', 'seats', 'actions'];

  constructor(
    private eventService: EventService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = [...events];
        this.applyFilter();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading events', error);
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    // Filtre par terme de recherche
    let filtered = this.events;
    
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search) ||
        event.organizer.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search)
      );
    }
    
    // Filtre par statut
    if (this.filterStatus !== 'all') {
      const now = new Date().getTime();
      
      if (this.filterStatus === 'upcoming') {
        filtered = filtered.filter(event => {
          const eventTime = new Date(event.dateTime).getTime();
          return eventTime > now;
        });
      } else if (this.filterStatus === 'past') {
        filtered = filtered.filter(event => {
          const eventTime = new Date(event.dateTime).getTime();
          return eventTime <= now;
        });
      }
    }
    
    this.filteredEvents = filtered;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  isPastEvent(dateTime: string): boolean {
    const eventTime = new Date(dateTime).getTime();
    const now = new Date().getTime();
    return eventTime < now;
  }

  openDeleteDialog(event: EventModel): void {
    const dialogRef = this.dialog.open(DeleteEventDialogComponent, {
      width: '400px',
      data: { event }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent(event.id!);
      }
    });
  }

  deleteEvent(id: string): void {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== id);
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error deleting event', error);
      }
    });
  }

  viewBookings(event: EventModel): void {
    this.dialog.open(ViewBookingsDialogComponent, {
      width: '600px',
      data: { eventId: event.id, eventTitle: event.title }
    });
  }
}