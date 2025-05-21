import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventService } from '../../../core/services/event.service';
import { EventModel } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  isEditMode = false;
  eventId: string | null = null;
  isSaving = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');

      // Ne chargez l'événement que si nous sommes en mode édition
      // et si l'ID n'est pas "create"
      if (this.eventId && this.eventId !== 'create') {
        this.isEditMode = true;
        this.loadEvent(this.eventId);
      } else {
        // En mode création, pas besoin de charger un événement
        this.isEditMode = false;
      }
    });
  }

  initForm(): void {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: [new Date(), Validators.required], // Date par défaut
      location: ['', Validators.required],
      totalSeats: [100, [Validators.required, Validators.min(1)]],
      organizer: ['', Validators.required],
      categories: [''],
      imageUrl: ['']
    });
  }

  loadEvent(id: string): void {
    this.eventService.getEvent(id).subscribe({
      next: (event) => {
        // Convertir les catégories en chaîne séparée par des virgules
        const categoriesString = event.categories.join(', ');

        this.eventForm.patchValue({
          title: event.title,
          description: event.description,
          dateTime: new Date(event.dateTime),
          location: event.location,
          totalSeats: event.totalSeats,
          organizer: event.organizer,
          categories: categoriesString,
          imageUrl: event.imageUrl
        });
      },
      error: (error) => {
        console.error('Error loading event', error);
        this.errorMessage = 'Impossible de charger les détails de l\'événement.';
      }
    });
  }

  // Reste du code inchangé...

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    // Convertir la chaîne de catégories en tableau
    const categories = this.eventForm.value.categories
      ? this.eventForm.value.categories.split(',').map((category: string) => category.trim()).filter((category: string) => category)
      : [];

    // Formater la date correctement
    const dateTime = this.formatDate(this.eventForm.value.dateTime);

    const eventData: EventModel = {
      ...this.eventForm.value,
      categories,
      dateTime
    };

    if (this.isEditMode && this.eventId) {
      this.updateEvent(this.eventId, eventData);
    } else {
      this.createEvent(eventData);
    }
  }

  createEvent(eventData: EventModel): void {
    this.eventService.createEvent(eventData).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/admin/events']);
      },
      error: (error) => {
        this.isSaving = false;
        console.error('Error creating event', error);
        this.errorMessage = 'Une erreur est survenue lors de la création de l\'événement.';
      }
    });
  }

  updateEvent(id: string, eventData: EventModel): void {
    this.eventService.updateEvent(id, eventData).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/admin/events']);
      },
      error: (error) => {
        this.isSaving = false;
        console.error('Error updating event', error);
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour de l\'événement.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/events']);
  }

  // Formate la date pour l'API
  private formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString();
  }
}
