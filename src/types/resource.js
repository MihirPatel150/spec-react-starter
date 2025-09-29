// Resource types converted to plain objects/constants

export const ResourceTypes = {
  GPU: 'gpu',
  LAB_EQUIPMENT: 'lab_equipment',
  CLASSROOM: 'classroom',
  SOFTWARE: 'software'
};

export const ResourceStatus = {
  AVAILABLE: 'available',
  BOOKED: 'booked', 
  MAINTENANCE: 'maintenance'
};

export const RequestStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
};