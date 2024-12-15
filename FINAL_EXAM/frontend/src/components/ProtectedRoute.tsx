import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	return isAuthenticated ? children : <Navigate to='/login' />;
};

export default ProtectedRoutes;
