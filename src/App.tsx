import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import UAVList from "./pages/UAVList";
import UAVDetail from "./pages/UAVDetail";
import MaintenanceList from "./pages/MaintenanceList";
import MaintenanceProcedure from "./pages/MaintenanceProcedure";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthGuard from "./components/auth/AuthGuard";
import { AuthProvider } from "./components/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="uavs" element={<UAVList />} />
          <Route path="uavs/:id" element={<UAVDetail />} />
          <Route path="maintenance" element={<MaintenanceList />} />
          <Route path="maintenance/:id" element={<MaintenanceProcedure />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
