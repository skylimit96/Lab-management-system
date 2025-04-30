export type Status = 'operational' | 'maintenance' | 'repair' | 'critical' | 'unknown';

export interface UAV {
  id: string;
  uavNumber: string;
  location: string;
  status: Status;
  malfunctions: string;
  arrivalDate: string;
  completionDate?: string;
  managerSignature?: string;
  notes?: string;
}

export interface DashboardStats {
  total: number;
  operational: number;
  maintenance: number;
  repair: number;
  critical: number;
  unknown: number;
  recentArrivals: number;
  completedToday: number;
}

export interface MaintenanceStep {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isCompleted: boolean;
  estimatedTime: string;
  tools: string[];
  safetyNotes?: string;
}

export interface MaintenanceProcedure {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: MaintenanceStep[];
}