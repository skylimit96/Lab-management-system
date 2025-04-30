import React from 'react';
import { UAV } from '../../types';
import { format, parseISO } from 'date-fns';
import StatusBadge from '../ui/StatusBadge';
import Card from '../ui/Card';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RecentArrivalsProps {
  uavs: UAV[];
}

const RecentArrivals: React.FC<RecentArrivalsProps> = ({ uavs }) => {
  const sortedUAVs = [...uavs]
    .sort((a, b) => new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime())
    .slice(0, 5);
  
  return (
    <Card 
      title="Recent Arrivals" 
      footer={
        <Link to="/uavs" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          View all UAVs
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      }
    >
      <div className="divide-y divide-gray-100">
        {sortedUAVs.length > 0 ? (
          sortedUAVs.map((uav) => (
            <div key={uav.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <Link to={`/uavs/${uav.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                  {uav.uavNumber}
                </Link>
                <StatusBadge status={uav.status} size="sm" />
              </div>
              <div className="text-sm text-gray-600">
                <p>Location: {uav.location}</p>
                <p>Arrived: {format(parseISO(uav.arrivalDate), 'MMM d, yyyy')}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 py-4 text-center">No recent arrivals</p>
        )}
      </div>
    </Card>
  );
};

export default RecentArrivals;