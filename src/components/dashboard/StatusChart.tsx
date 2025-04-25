import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import Card from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusChartProps {
  operational: number;
  maintenance: number;
  repair: number;
  critical: number;
  unknown: number;
}

const StatusChart: React.FC<StatusChartProps> = ({
  operational,
  maintenance,
  repair,
  critical,
  unknown
}) => {
  const data: ChartData<'doughnut'> = {
    labels: ['Operational', 'Maintenance', 'Repair', 'Critical', 'Unknown'],
    datasets: [
      {
        data: [operational, maintenance, repair, critical, unknown],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',  // Green - operational
          'rgba(59, 130, 246, 0.8)',  // Blue - maintenance
          'rgba(251, 191, 36, 0.8)',  // Amber - repair
          'rgba(239, 68, 68, 0.8)',   // Red - critical
          'rgba(156, 163, 175, 0.8)', // Gray - unknown
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
  };
  
  return (
    <Card title="UAV Status Distribution">
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </Card>
  );
};

export default StatusChart;