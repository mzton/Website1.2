import { User, Teacher, Client, TeacherProfile, ClientProfile, Booking, Review, Document } from '@/types/auth';

// In-memory database simulation for development
// In production, this would be replaced with a real database

class Database {
  private users: Map<string, User> = new Map();
  private teacherProfiles: Map<string, TeacherProfile> = new Map();
  private clientProfiles: Map<string, ClientProfile> = new Map();
  private bookings: Map<string, Booking> = new Map();
  private reviews: Map<string, Review> = new Map();
  private documents: Map<string, Document> = new Map();

  // User operations
  createUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (user) {
      const updatedUser = { ...user, ...updates, updatedAt: new Date() };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  // Teacher profile operations
  createTeacherProfile(profile: TeacherProfile): TeacherProfile {
    this.teacherProfiles.set(profile.id, profile);
    return profile;
  }

  getTeacherProfile(teacherId: string): TeacherProfile | undefined {
    return Array.from(this.teacherProfiles.values()).find(profile => profile.teacherId === teacherId);
  }

  updateTeacherProfile(teacherId: string, updates: Partial<TeacherProfile>): TeacherProfile | undefined {
    const profile = this.getTeacherProfile(teacherId);
    if (profile) {
      const updatedProfile = { ...profile, ...updates };
      this.teacherProfiles.set(profile.id, updatedProfile);
      return updatedProfile;
    }
    return undefined;
  }

  getAllTeachers(): (Teacher & { profile?: TeacherProfile })[] {
    const teachers = Array.from(this.users.values()).filter(user => user.role === 'teacher') as Teacher[];
    return teachers.map(teacher => ({
      ...teacher,
      profile: this.getTeacherProfile(teacher.id)
    }));
  }

  // Client profile operations
  createClientProfile(profile: ClientProfile): ClientProfile {
    this.clientProfiles.set(profile.id, profile);
    return profile;
  }

  getClientProfile(clientId: string): ClientProfile | undefined {
    return Array.from(this.clientProfiles.values()).find(profile => profile.clientId === clientId);
  }

  updateClientProfile(clientId: string, updates: Partial<ClientProfile>): ClientProfile | undefined {
    const profile = this.getClientProfile(clientId);
    if (profile) {
      const updatedProfile = { ...profile, ...updates };
      this.clientProfiles.set(profile.id, updatedProfile);
      return updatedProfile;
    }
    return undefined;
  }

  // Booking operations
  createBooking(booking: Booking): Booking {
    this.bookings.set(booking.id, booking);
    return booking;
  }

  getBooking(id: string): Booking | undefined {
    return this.bookings.get(id);
  }

  getBookingsByTeacher(teacherId: string): Booking[] {
    return Array.from(this.bookings.values()).filter(booking => booking.teacherId === teacherId);
  }

  getBookingsByClient(clientId: string): Booking[] {
    return Array.from(this.bookings.values()).filter(booking => booking.clientId === clientId);
  }

  updateBooking(id: string, updates: Partial<Booking>): Booking | undefined {
    const booking = this.bookings.get(id);
    if (booking) {
      const updatedBooking = { ...booking, ...updates };
      this.bookings.set(id, updatedBooking);
      return updatedBooking;
    }
    return undefined;
  }

  // Review operations
  createReview(review: Review): Review {
    this.reviews.set(review.id, review);
    return review;
  }

  getReviewsByTeacher(teacherId: string): Review[] {
    return Array.from(this.reviews.values()).filter(review => review.teacherId === teacherId);
  }

  getReviewsByClient(clientId: string): Review[] {
    return Array.from(this.reviews.values()).filter(review => review.clientId === clientId);
  }

  updateReview(reviewId: string, updates: Partial<Review>): Review | undefined {
    const review = this.reviews.get(reviewId);
    if (review) {
      const updatedReview = { ...review, ...updates };
      this.reviews.set(reviewId, updatedReview);
      return updatedReview;
    }
    return undefined;
  }

  // Document operations
  createDocument(document: Document): Document {
    this.documents.set(document.id, document);
    return document;
  }

  getDocumentsByTeacher(teacherId: string): Document[] {
    return Array.from(this.documents.values()).filter(doc => doc.teacherId === teacherId);
  }

  updateDocument(id: string, updates: Partial<Document>): Document | undefined {
    const document = this.documents.get(id);
    if (document) {
      const updatedDocument = { ...document, ...updates };
      this.documents.set(id, updatedDocument);
      return updatedDocument;
    }
    return undefined;
  }
}

// Singleton instance
export const db = new Database();

// Helper functions
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}