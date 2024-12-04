import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated } = useAuth();

	// If the user is not authenticated, redirect to the login page
	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	// If the user is authenticated, render the children
	return <>{children}</>;
};

export default ProtectedRoute;
