import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginFormData } from '../components/Login';

// Create context
interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (credentials: ILoginFormData) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	const login = async (credentials: ILoginFormData) => {
		setIsLoading(true);
		try {
			const response = await fetch('http://localhost:3001/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});
			if (!response.ok) {
				throw new Error('Somehthing wrong happened');
			}
			const data = await response.json();
			if (data) {
				setIsAuthenticated(true);
				navigate('/');
			}
			setIsLoading(false);
		} catch (error) {
			console.error('Login failed:', error);
			setIsAuthenticated(false);
			setIsLoading(false);
		}
		navigate('/'); // Redirect after login
	};

	const logout = () => {
		setIsAuthenticated(false);
		navigate('/'); // Redirect after logout
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, logout, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
