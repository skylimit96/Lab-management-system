import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import Card from '../components/ui/Card';
import useUAVStore from '../store/uavStore';
import { parseISO, format, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Statistics: React.FC = () => {
  const { uavs } = useUAVStore();
  
  // Status Distribution Data
  const statusCounts = uavs.reduce(
    (acc, uav) => {
      acc[uav.status] = (acc[uav.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  const statusData = {
    labels: ['Operational', 'Maintenance', 'Repair', 'Critical', 'Unknown'],
    datasets: [
      {
        label: 'UAVs by Status',
        data: [
          statusCounts.operational || 0,
          statusCounts.maintenance || 0,
          statusCounts.repair || 0,
          statusCounts.critical || 0,
          statusCounts.unknown || 0,
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',  // green
          'rgba(59, 130, 246, 0.7)',  // blue
          'rgba(251, 191, 36, 0.7)',  // amber
          'rgba(239, 68, 68, 0.7)',   // red
          'rgba(156, 163, 175, 0.7)', // gray
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Location Distribution Data
  const locationCounts = uavs.reduce(
    (acc, uav) => {
      acc[uav.location] = (acc[uav.location] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  const locationData = {
    labels: Object.keys(locationCounts),
    datasets: [
      {
        label: 'UAVs by Location',
        data: Object.values(locationCounts),
        backgroundColor: 'rgba(79, 70, 229, 0.7)', // indigo
        borderWidth: 1,
      },
    ],
  };
  
  // Arrivals Over Time
  // Get last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    return format(subDays(new Date(), 29 - i), 'yyyy-MM-dd');
  });
  
  // Count arrivals per day
  const arrivalsPerDay = last30Days.map(day => {
    return uavs.filter(uav => uav.arrivalDate === day).length;
  });
  
  const arrivalsData = {
    labels: last30Days.map(day => format(parseISO(day), 'MMM d')),
    datasets: [
      {
        label: 'New Arrivals',
        data: arrivalsPerDay,
        borderColor: 'rgba(14, 165, 233, 1)', // sky blue
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  // Most common malfunctions
  const malfunctionCounts = uavs.reduce(
    (acc, uav) => {
      const key = uav.malfunctions.trim();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  // Sort by count and take top 5
  const topMalfunctions = Object.entries(malfunctionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const malfunctionData = {
    labels: topMalfunctions.map(([label]) => label),
    datasets: [
      {
        label: 'Common Malfunctions',
        data: topMalfunctions.map(([, count]) => count),
        backgroundColor: 'rgba(217, 70, 239, 0.7)', // fuchsia
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Maintenance Statistics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="UAV Status Distribution">
          <div className="h-80">
            <Bar
              data={statusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </Card>
        
        <Card title="UAVs by Location">
          <div className="h-80">
            <Bar
              data={locationData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </Card>
        
        <Card title="UAV Arrivals (Last 30 Days)">
          <div className="h-80">
            <Line
              data={arrivalsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0,
                    },
                  },
                },
              }}
            />
          </div>
        </Card>
        
        <Card title="Top 5 Malfunctions">
          <div className="h-80">
            <Bar
              data={malfunctionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
                indexAxis: 'y',
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;