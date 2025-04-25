import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Save, Download, Upload } from 'lucide-react';

const Settings: React.FC = () => {
  const [labName, setLabName] = useState('UAV Maintenance Lab');
  const [managerName, setManagerName] = useState('John Doe');
  const [managerEmail, setManagerEmail] = useState('john.doe@example.com');
  const [darkMode, setDarkMode] = useState(false);
  
  const handleExportData = () => {
    // In a real app, this would export data from the database
    alert('Data export functionality would be implemented here.');
  };
  
  const handleImportData = () => {
    // In a real app, this would import data into the database
    alert('Data import functionality would be implemented here.');
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Lab Information">
          <div className="space-y-4">
            <div>
              <label htmlFor="labName" className="block text-sm font-medium text-gray-700">
                Lab Name
              </label>
              <input
                type="text"
                id="labName"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="managerName" className="block text-sm font-medium text-gray-700">
                Manager Name
              </label>
              <input
                type="text"
                id="managerName"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="managerEmail" className="block text-sm font-medium text-gray-700">
                Manager Email
              </label>
              <input
                type="email"
                id="managerEmail"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <Button variant="primary" icon={<Save className="h-4 w-4" />}>
              Save Settings
            </Button>
          </div>
        </Card>
        
        <Card title="Application Settings">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="darkMode"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
                Dark Mode (Coming Soon)
              </label>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Data Management</h4>
              
              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  icon={<Download className="h-4 w-4" />}
                >
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  onClick={handleImportData}
                  icon={<Upload className="h-4 w-4" />}
                >
                  Import Data
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Database Connection">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              In a production environment, this application would connect to a MySQL database to store UAV maintenance records. The connection details would be configured here.
            </p>
            
            <div>
              <label htmlFor="dbHost" className="block text-sm font-medium text-gray-700">
                Database Host
              </label>
              <input
                type="text"
                id="dbHost"
                value="localhost"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
              />
            </div>
            
            <div>
              <label htmlFor="dbPort" className="block text-sm font-medium text-gray-700">
                Database Port
              </label>
              <input
                type="text"
                id="dbPort"
                value="3306"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
              />
            </div>
            
            <div>
              <label htmlFor="dbName" className="block text-sm font-medium text-gray-700">
                Database Name
              </label>
              <input
                type="text"
                id="dbName"
                value="drone_maintenance"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;