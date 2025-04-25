import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import UAVList from './pages/UAVList';
import UAVDetail from './pages/UAVDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="uavs" element={<UAVList />} />
        <Route path="uavs/:id" element={<UAVDetail />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;