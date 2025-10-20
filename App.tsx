import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import Statistics from './pages/Statistics';
import AllShipments from './pages/AllShipments';
import ManageCompanies from './pages/ManageCompanies';
import Profile from './pages/Profile';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const auth = useAuth();
  if (auth === null) {
      return <div>Loading...</div>;
  }
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/statistics" replace />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="all-shipments" element={<AllShipments />} />
            <Route path="manage-companies" element={<ManageCompanies />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;