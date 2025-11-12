export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Assistant' | 'Viewer';
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin extends User {
  role: 'Admin';
  profile?: AdminProfile;
  permissions: AdminPermission[];
}

export interface Assistant extends User {
  role: 'Assistant';
  profile?: AssistantProfile;
  permissions: AssistantPermission[];
}

export interface Viewer extends User {
  role: 'Viewer';
  profile?: ViewerProfile;
}

export interface AdminProfile {
  id: string;
  userId: string;
  bio?: string;
  department?: string;
  profileImage?: string;
  phoneNumber?: string;
}

export interface AssistantProfile {
  id: string;
  userId: string;
  bio?: string;
  department?: string;
  profileImage?: string;
  assignedTasks?: string[];
}

export interface ViewerProfile {
  id: string;
  userId: string;
  bio?: string;
  profileImage?: string;
  accessLevel?: string;
}

export type AdminPermission = 
  | 'manage_users'
  | 'manage_content'
  | 'view_analytics'
  | 'manage_settings'
  | 'delete_data';

export type AssistantPermission = 
  | 'edit_content'
  | 'view_analytics'
  | 'moderate_content';

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  role?: 'Admin' | 'Assistant' | 'Viewer';
}

export interface RegisterFormData extends AuthFormData {
  name: string;
  role: 'Admin' | 'Assistant' | 'Viewer';
  confirmPassword?: string;
}