import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Database,
  BarChart2,
  Settings,
  X,
  Plane as Drone,
  Wrench,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 bottom-0 w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out z-30
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-0
      `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Drone className="h-6 w-6 text-blue-400" />
            <span className="font-semibold text-lg">
              <b>UAV</b> Plus
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4">
          <NavLink
            to="/"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 transition-colors
              ${isActive ? "bg-slate-700 text-white" : ""}
            `}
            end
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/uavs"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 transition-colors
              ${isActive ? "bg-slate-700 text-white" : ""}
            `}
          >
            <Database className="h-5 w-5 mr-3" />
            <span>UAV Database</span>
          </NavLink>

          <NavLink
            to="/maintenance"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 transition-colors
              ${isActive ? "bg-slate-700 text-white" : ""}
            `}
          >
            <Wrench className="h-5 w-5 mr-3" />
            <span>Maintenance</span>
          </NavLink>

          <NavLink
            to="/statistics"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 transition-colors
              ${isActive ? "bg-slate-700 text-white" : ""}
            `}
          >
            <BarChart2 className="h-5 w-5 mr-3" />
            <span>Statistics</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 transition-colors
              ${isActive ? "bg-slate-700 text-white" : ""}
            `}
          >
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="text-sm text-gray-400">
            <p>Drone Maintenance Lab</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
