import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();
	console.log(isAuthenticated);
	const navigate = useNavigate();
	if (!isAuthenticated) {
		navigate('/login');
	}

	return <>{children}</>;
};
