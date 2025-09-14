export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'done';
  assignees: User[];
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  startDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Leave {
  id: string;
  userId: string;
  userName: string;
  startDate: Date;
  endDate: Date;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FlowElement {
  id: string;
  type: 'rectangle' | 'oval' | 'diamond' | 'arrow' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  connections?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}