import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { EventListComponent } from './features/events/event-list/event-list.component';
import { EventDetailComponent } from './features/events/event-detail/event-detail.component';
import { BookingListComponent } from './features/bookings/booking-list/booking-list.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { EventManagementComponent } from './features/admin/event-management/event-management.component';
import { EventFormComponent } from './features/admin/event-form/event-form.component';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
  {
    path: 'bookings',
    component: BookingListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'events', component: EventManagementComponent },
      { path: 'events/new', component: EventFormComponent },
      { path: 'events/edit/:id', component: EventFormComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
