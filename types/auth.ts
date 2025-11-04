export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'client';
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher extends User {
  role: 'teacher';
  profile?: TeacherProfile;
  isVerified: boolean;
  documents?: Document[];
}

export interface Client extends User {
  role: 'client';
  profile?: ClientProfile;
}

export interface TeacherProfile {
  id: string;
  teacherId: string;
  bio?: string;
  subjects: string[];
  qualifications: string[];
  experience: number;
  hourlyRate: number;
  availability: AvailabilitySlot[];
  languages: string[];
  timezone: string;
  profileImage?: string;
  rating: number;
  totalReviews: number;
}

export interface ClientProfile {
  id: string;
  clientId: string;
  bio?: string;
  interests: string[];
  preferredLanguages: string[];
  timezone: string;
  profileImage?: string;
}

export interface Document {
  id: string;
  teacherId: string;
  type: 'certificate' | 'diploma' | 'id' | 'other';
  name: string;
  url: string;
  verified: boolean;
  uploadedAt: Date;
}

export interface AvailabilitySlot {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  teacherId: string;
  clientId: string;
  subject: string;
  scheduledAt: Date;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  teacherId: string;
  clientId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  role?: 'teacher' | 'client';
}

export interface RegisterFormData extends AuthFormData {
  name: string;
  role: 'teacher' | 'client';
  confirmPassword: string;
}