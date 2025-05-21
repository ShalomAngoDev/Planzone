import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Booking } from '../../../core/models/booking.model';

interface DialogData {
  booking: Booking;
}

@Component({
  selector: 'app-cancel-booking-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './cancel-booking-dialog.component.html',
  styleUrls: ['./cancel-booking-dialog.component.scss']
})
export class CancelBookingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}