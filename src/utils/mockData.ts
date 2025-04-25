import { UAV, Status } from '../types';
import { format, subDays } from 'date-fns';

const statuses: Status[] = ['operational', 'maintenance', 'repair', 'critical', 'unknown'];
const locations = ['Hangar A', 'Field Site B', 'Workshop C', 'Bay 4', 'Testing Area', 'Storage'];
const malfunctions = [
  'Motor failure',
  'Battery not charging',
  'Communication error',
  'Propeller damage',
  'Control system issue',
  'Camera malfunction',
  'GPS signal loss',
  'Firmware error',
  'Structural damage',
  'No issues detected'
];

const randomFromArray = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateRandomDate = (daysAgo: number): string => {
  const date = subDays(new Date(), Math.floor(Math.random() * daysAgo));
  return format(date, 'yyyy-MM-dd');
};

export const generateMockData = (count: number): UAV[] => {
  return Array.from({ length: count }, (_, i) => {
    const status = randomFromArray(statuses);
    const arrivalDate = generateRandomDate(30);
    
    // Only completed UAVs have completion dates and signatures
    const isCompleted = status === 'operational';
    
    return {
      id: crypto.randomUUID(),
      uavNumber: `UAV-${String(i + 1000).slice(1)}`,
      location: randomFromArray(locations),
      status,
      malfunctions: randomFromArray(malfunctions),
      arrivalDate,
      completionDate: isCompleted ? generateRandomDate(7) : undefined,
      managerSignature: isCompleted ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA' : undefined,
      notes: isCompleted ? 'Maintenance completed successfully.' : 'In progress'
    };
  });
};