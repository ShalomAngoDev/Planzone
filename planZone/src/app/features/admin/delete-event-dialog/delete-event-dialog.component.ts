import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EventModel } from '../../../core/models/event.model';

interface DialogData {
  event: EventModel;
}

@Component({
  selector: 'app-delete-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-event-dialog.component.html'
})
export class DeleteEventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}