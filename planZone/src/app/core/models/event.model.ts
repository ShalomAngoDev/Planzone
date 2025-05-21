export interface EventModel {
  id?: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  totalSeats: number;
  availableSeats?: number;
  organizer: string;
  categories: string[];
  imageUrl: string;
}