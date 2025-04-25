import React, { useState, useEffect } from 'react';
import { UAV, Status } from '../../types';
import Button from '../ui/Button';
import { Save, X } from 'lucide-react';

interface UAVFormProps {
  uav?: UAV;
  onSubmit: (data: Omit<UAV, 'id'>) => void;
  onCancel: () => void;
}

const statusOptions: { value: Status; label: string }[] = [
  { value: 'operational', label: 'Operational' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'repair', label: 'Repair' },
  { value: 'critical', label: 'Critical' },
  { value: 'unknown', label: 'Unknown' },
];

const UAVForm: React.FC<UAVFormProps> = ({ uav, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<UAV, 'id'>>({
    uavNumber: '',
    location: '',
    status: 'unknown',
    malfunctions: '',
    arrivalDate: new Date().toISOString().split('T')[0],
  });
  
  useEffect(() => {
    if (uav) {
      setFormData({
        uavNumber: uav.uavNumber,
        location: uav.location,
        status: uav.status,
        malfunctions: uav.malfunctions,
        arrivalDate: uav.arrivalDate,
        completionDate: uav.completionDate,
        managerSignature: uav.managerSignature,
        notes: uav.notes,
      });
    }
  }, [uav]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="uavNumber" className="block text-sm font-medium text-gray-700">
            UAV Number
          </label>
          <input
            type="text"
            name="uavNumber"
            id="uavNumber"
            required
            value={formData.uavNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">
            Arrival Date
          </label>
          <input
            type="date"
            name="arrivalDate"
            id="arrivalDate"
            required
            value={formData.arrivalDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
            Completion Date
          </label>
          <input
            type="date"
            name="completionDate"
            id="completionDate"
            value={formData.completionDate || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="malfunctions" className="block text-sm font-medium text-gray-700">
          Malfunctions
        </label>
        <textarea
          name="malfunctions"
          id="malfunctions"
          rows={3}
          required
          value={formData.malfunctions}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          value={formData.notes || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          icon={<X className="h-4 w-4" />}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          icon={<Save className="h-4 w-4" />}
        >
          Save UAV
        </Button>
      </div>
    </form>
  );
};

export default UAVForm;