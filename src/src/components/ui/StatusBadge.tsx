import React from 'react';
import { Status } from '../../types';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'operational':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: 'Operational',
          dot: 'bg-green-500'
        };
      case 'maintenance':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          label: 'Maintenance',
          dot: 'bg-blue-500'
        };
      case 'repair':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          label: 'Repair',
          dot: 'bg-amber-500'
        };
      case 'critical':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: 'Critical',
          dot: 'bg-red-500'
        };
      case 'unknown':
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: 'Unknown',
          dot: 'bg-gray-500'
        };
    }
  };
  
  const { bg, text, label, dot } = getStatusConfig();
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full ${bg} ${text} ${sizeClasses[size]}`}>
      <span className={`w-2 h-2 mr-1.5 rounded-full ${dot}`}></span>
      {label}
    </span>
  );
};

export default StatusBadge;