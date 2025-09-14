export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  poster: string;
  organizerId: string;
  organizerName: string;
  organizerType: 'college' | 'company';
  category: 'workshop' | 'hackathon' | 'medical-camp' | 'seminar' | 'technical' | 'non-technical' | 'paper-presentation';
  maxParticipants: number;
  currentParticipants: number;
  registrationOpen: boolean;
  registrationLink?: string;
  certificate?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  college?: string;
  role: 'student' | 'organizer';
  avatar?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userCollege: string;
  registeredAt: string;
  attended: boolean;
  certificateDownloaded: boolean;
}