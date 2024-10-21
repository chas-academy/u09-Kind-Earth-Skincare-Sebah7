import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { PacmanLoader } from 'react-spinners';

interface ProtectedRouteProps {
  element: React.ReactElement;
  roles?: number; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute - User:", user);
  console.log("ProtectedRoute - Loading:", loading);
  console.log("ProtectedRoute - Roles:", roles);

  if (loading) {
    return <PacmanLoader color="#91b553" />;
  }

  if (!user) {
        console.log("ProtectedRoute - No user, redirecting to /login");
    return <Navigate to="/login" />;
  }

  console.log("ProtectedRoute - Final Check - User Role:", user.role);
console.log("ProtectedRoute - Final Check - Expected Role:", roles);

  if (roles !== undefined && user.role !== roles) {
        console.log(`ProtectedRoute - User role ${user.role} not authorized, redirecting to /not-authorized`);

    return <Navigate to="/not-authorized" />;
  }

  return element;
};

export default ProtectedRoute;
