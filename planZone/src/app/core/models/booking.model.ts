import { EventModel } from './event.model';

export interface Booking {
  id?: string;
  userId: string;
  eventId: string;
  event?: EventModel;
  numberOfSeats: number;
  bookingDate?: string;
  status?: string;
}