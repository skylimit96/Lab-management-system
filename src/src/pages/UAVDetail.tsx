import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUAVStore from '../store/uavStore';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';
import { Edit, ArrowLeft } from 'lucide-react';
import UAVForm from '../components/uav/UAVForm';
import SignatureCapture from '../components/uav/SignatureCapture';
import { format, parseISO } from 'date-fns';
import { UAV } from '../types';

const UAVDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { uavs, updateUAV } = useUAVStore();
  
  const [isEditing, setIsEditing] = useState(false);
  
  if (!id) {
    navigate('/uavs');
    return null;
  }
  
  const uav = uavs.find(u => u.id === id);
  
  if (!uav) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">UAV Not Found</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate('/uavs')}
          icon={<ArrowLeft className="h-5 w-5" />}
        >
          Back to UAV List
        </Button>
      </div>
    );
  }
  
  const handleUpdate = (data: Omit<UAV, 'id'>) => {
    updateUAV(id, data);
    setIsEditing(false);
  };
  
  const handleSignatureSave = (signatureData: string) => {
    updateUAV(id, { managerSignature: signatureData });
  };
  
  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            icon={<ArrowLeft className="h-5 w-5" />}
          >
            Cancel Edit
          </Button>
          <h2 className="text-2xl font-medium text-gray-700">Edit UAV: {uav.uavNumber}</h2>
        </div>
        
        <Card>
          <UAVForm 
            uav={uav} 
            onSubmit={handleUpdate} 
            onCancel={() => setIsEditing(false)} 
          />
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/uavs')}
            icon={<ArrowLeft className="h-5 w-5" />}
          >
            Back
          </Button>
          <h2 className="text-2xl font-medium text-gray-700">{uav.uavNumber}</h2>
          <StatusBadge status={uav.status} size="lg" />
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setIsEditing(true)}
          icon={<Edit className="h-5 w-5" />}
        >
          Edit Details
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="UAV Information">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Location</h4>
                <p className="mt-1">{uav.location}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Arrival Date</h4>
                <p className="mt-1">{format(parseISO(uav.arrivalDate), 'MMMM d, yyyy')}</p>
              </div>
              
              {uav.completionDate && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Completion Date</h4>
                  <p className="mt-1">{format(parseISO(uav.completionDate), 'MMMM d, yyyy')}</p>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Malfunctions</h4>
              <p className="mt-1">{uav.malfunctions}</p>
            </div>
            
            {uav.notes && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                <p className="mt-1">{uav.notes}</p>
              </div>
            )}
          </div>
        </Card>
        
        <Card title="Maintenance Sign-off">
          {uav.managerSignature ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Manager Signature</h4>
                <div className="mt-2 border p-2 rounded-md bg-white">
                  <img 
                    src={uav.managerSignature} 
                    alt="Manager Signature" 
                    className="max-h-32"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  size="sm"
                >
                  Update Signature
                </Button>
              </div>
            </div>
          ) : (
            <SignatureCapture onSave={handleSignatureSave} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default UAVDetail;