import React, { useState, useEffect } from 'react';
import useUAVStore from '../store/uavStore';
import UAVTable from '../components/uav/UAVTable';
import Button from '../components/ui/Button';
import { Plus, Search, Filter, Loader } from 'lucide-react';
import { Status } from '../types';
import UAVForm from '../components/uav/UAVForm';
import Card from '../components/ui/Card';

const UAVList: React.FC = () => {
  const { 
    uavs, 
    filteredUAVs, 
    searchTerm, 
    statusFilter,
    loading,
    error,
    fetchUAVs,
    setSearchTerm, 
    setStatusFilter,
    addUAV,
    updateUAV,
    deleteUAV
  } = useUAVStore();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchUAVs();
  }, [fetchUAVs]);
  
  useEffect(() => {
    setSearchTerm('');
  }, [setSearchTerm]);
  
  const handleAddUAV = async (data: Omit<UAV, 'id'>) => {
    await addUAV(data);
    setShowAddForm(false);
  };
  
  const handleEditUAV = (id: string) => {
    setEditingId(id);
  };
  
  const handleUpdateUAV = async (data: Omit<UAV, 'id'>) => {
    if (editingId) {
      await updateUAV(editingId, data);
      setEditingId(null);
    }
  };
  
  const handleDeleteUAV = async (id: string) => {
    if (confirm('Are you sure you want to delete this UAV?')) {
      await deleteUAV(id);
    }
  };
  
  const statusOptions: { value: Status | 'all'; label: string }[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'operational', label: 'Operational' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'repair', label: 'Repair' },
    { value: 'critical', label: 'Critical' },
    { value: 'unknown', label: 'Unknown' },
  ];
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => fetchUAVs()}>Retry</Button>
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
  
  const displayedUAVs = searchTerm || statusFilter !== 'all' ? filteredUAVs : uavs;
  
  if (showAddForm) {
    return (
      <Card title="Add New UAV">
        <UAVForm 
          onSubmit={handleAddUAV} 
          onCancel={() => setShowAddForm(false)} 
        />
      </Card>
    );
  }
  
  if (editingId) {
    const uavToEdit = uavs.find(uav => uav.id === editingId);
    
    if (!uavToEdit) return <div>UAV not found</div>;
    
    return (
      <Card title={`Edit UAV: ${uavToEdit.uavNumber}`}>
        <UAVForm 
          uav={uavToEdit}
          onSubmit={handleUpdateUAV} 
          onCancel={() => setEditingId(null)} 
        />
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search UAVs..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
              className="rounded-md border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <Button 
          variant="primary" 
          onClick={() => setShowAddForm(true)}
          icon={<Plus className="h-5 w-5" />}
        >
          Add New UAV
        </Button>
      </div>
      
      <UAVTable 
        data={displayedUAVs} 
        onEdit={handleEditUAV} 
        onDelete={handleDeleteUAV} 
      />
    </div>
  );
};

export default UAVList;