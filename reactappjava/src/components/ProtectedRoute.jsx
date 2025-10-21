import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAdmin, children }) {
  if (!isAdmin) { return <Navigate to="/login" replace />; } return children;
}

export default ProtectedRoute;
