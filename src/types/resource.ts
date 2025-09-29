export type ResourceStatus = 'available' | 'booked' | 'maintenance';
export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  status: ResourceStatus;
  capacity?: number;
  specifications?: Record<string, any>;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  resourceId: string;
  resourceName: string;
  startTime: string;
  endTime: string;
  duration: number; // in hours
  purpose: string;
  status: RequestStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
  requestId?: string;
}

export interface UsageHistory {
  id: string;
  userId: string;
  resourceId: string;
  resourceName: string;
  startTime: string;
  endTime: string;
  duration: number;
  purpose: string;
  actualUsage?: number;
  createdAt: string;
}