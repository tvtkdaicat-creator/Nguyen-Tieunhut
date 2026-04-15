export type ProjectStatus = 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Delayed';

export interface Project {
  id: string;
  name: string;
  location: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  manager: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  stock: number;
  minStock: number;
  pricePerUnit: number;
  supplier: string;
}

export interface Labor {
  id: string;
  name: string;
  role: string;
  skillLevel: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  status: 'Active' | 'On Leave' | 'Inactive';
  assignedProject?: string;
  dailyRate: number;
}

export interface BudgetEntry {
  id: string;
  projectId: string;
  category: 'Materials' | 'Labor' | 'Equipment' | 'Permits' | 'Other';
  planned: number;
  actual: number;
  description: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  date: string;
  completed: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  rating: number;
  location: string;
}
