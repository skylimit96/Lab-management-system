import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/uavs':
        return 'UAV Database';
      case '/statistics':
        return 'Statistics';
      case '/settings':
        return 'Settings';
      default:
        if (location.pathname.startsWith('/uavs/')) {
          return 'UAV Details';
        }
        return 'Drone Maintenance Lab';
    }
  };
  
  return (
    <header className="h-16 bg-white shadow-sm flex items-center px-4 sticky top-0 z-10">
      <button 
        onClick={onMenuClick} 
        className="mr-4 lg:hidden focus:outline-none"
      >
        <Menu className="h-6 w-6 text-gray-500" />
      </button>
      
      <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
      
      <div className="flex-1 mx-4 max-w-lg hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative focus:outline-none">
          <Bell className="h-6 w-6 text-gray-500" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          AM
        </div>
      </div>
    </header>
  );
};

export default Header;