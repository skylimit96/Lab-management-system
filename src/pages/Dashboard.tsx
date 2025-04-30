import React, { useEffect } from "react";
import useUAVStore from "../store/uavStore";
import StatCard from "../components/dashboard/StatCard";
import StatusChart from "../components/dashboard/StatusChart";
import RecentArrivals from "../components/dashboard/RecentArrivals";
import {
  Bone as Drone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { uavs, getStats, fetchUAVs, loading, error } = useUAVStore();
  const stats = getStats();

  useEffect(() => {
    fetchUAVs();
  }, [fetchUAVs]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => fetchUAVs()}
          className="text-blue-600 hover:text-blue-800"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading && !uavs.length) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total UAVs"
          value={stats.total}
          icon={<Drone className="h-6 w-6" />}
          color="blue"
        />

        <StatCard
          title="Recent Arrivals"
          value={stats.recentArrivals}
          icon={<Calendar className="h-6 w-6" />}
          trend="up"
          trendValue="Last 7 days"
          color="amber"
        />

        <StatCard
          title="Critical Issues"
          value={stats.critical}
          icon={<AlertCircle className="h-6 w-6" />}
          color="red"
        />

        <StatCard
          title="Completed Today"
          value={stats.completedToday}
          icon={<CheckCircle className="h-6 w-6" />}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatusChart
            operational={stats.operational}
            maintenance={stats.maintenance}
            repair={stats.repair}
            critical={stats.critical}
            unknown={stats.unknown}
          />
        </div>

        <div>
          <RecentArrivals uavs={uavs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
