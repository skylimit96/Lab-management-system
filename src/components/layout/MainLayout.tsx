import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;