import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';
import { BookingService } from '../../core/services/booking.service';
import { User } from '../../core/models/user.model';
import { Booking } from '../../core/models/booking.model';

// Validateur personnalisé pour vérifier que les mots de passe correspondent
const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!newPassword || !confirmPassword) {
    return null;
  }

  return newPassword.value === confirmPassword.value 
    ? null 
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  bookings: Booking[] = [];
  loading = true;
  
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  
  isSaving = false;
  updateSuccess = false;
  updateError = '';
  
  isChangingPassword = false;
  passwordSuccess = false;
  passwordError = '';
  
  // Statistiques de l'utilisateur
  get bookingsCount(): number {
    return this.bookings.length;
  }
  
  get upcomingEventsCount(): number {
    const now = new Date().getTime();
    return this.bookings.filter(booking => {
      if (!booking.event?.dateTime) return false;
      const eventTime = new Date(booking.event.dateTime).getTime();
      return eventTime > now && booking.status !== 'CANCELLED';
    }).length;
  }

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    
    // Récupérer l'utilisateur connecté
    this.user = this.authService.getCurrentUser();
    
    // Initialiser les formulaires
    this.initForms();
    
    // Charger les réservations de l'utilisateur pour les statistiques
    if (this.user?.id) {
      this.bookingService.getUserBookings(this.user.id).subscribe({
        next: (bookings) => {
          this.bookings = bookings;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading user bookings', error);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  initForms(): void {
    this.profileForm = this.formBuilder.group({
      username: [this.user?.username, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]]
    });
    
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.isSaving = true;
    this.updateSuccess = false;
    this.updateError = '';
    
    // Simuler la mise à jour du profil (à remplacer par l'appel API réel)
    setTimeout(() => {
      // Normalement, vous appelez votre service pour mettre à jour le profil
      console.log('Profile update with:', this.profileForm.value);
      
      // Mise à jour de l'utilisateur local
      if (this.user) {
        this.user.username = this.profileForm.value.username;
        this.user.email = this.profileForm.value.email;
        
        // Stocker les nouvelles informations dans le localStorage
        localStorage.setItem('user_data', JSON.stringify(this.user));
      }
      
      this.isSaving = false;
      this.updateSuccess = true;
      
      // Masquer le message de succès après quelques secondes
      setTimeout(() => {
        this.updateSuccess = false;
      }, 3000);
    }, 1000);
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    
    this.isChangingPassword = true;
    this.passwordSuccess = false;
    this.passwordError = '';
    
    // Simuler le changement de mot de passe (à remplacer par l'appel API réel)
    setTimeout(() => {
      // Normalement, vous appelez votre service pour changer le mot de passe
      console.log('Password change with:', this.passwordForm.value);
      
      this.isChangingPassword = false;
      this.passwordSuccess = true;
      
      // Réinitialiser le formulaire
      this.passwordForm.reset();
      
      // Masquer le message de succès après quelques secondes
      setTimeout(() => {
        this.passwordSuccess = false;
      }, 3000);
    }, 1000);
  }
}