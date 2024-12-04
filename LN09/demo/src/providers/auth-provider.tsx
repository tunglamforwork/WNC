import axios from 'axios';
import { createContext, useContext, useState } from 'react';

interface AuthTaskType {
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (data: ILoginFormData) => Promise<void>;
	logout: () => void;
}

export interface ILoginFormData {
	email: string;
	password: string;
}

const AuthContext = createContext<AuthTaskType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const login = async (credentials: ILoginFormData) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				'http://localhost:3001/auth/login',
				credentials
			);
			const data = response.data;
			if (data) {
				setIsAuthenticated(true);
				setIsLoading(false);
				window.location.href = '/';
			} else {
				window.location.href = '/login';
			}
		} catch (error: any) {
			setIsAuthenticated(false);
			setIsLoading(false);
			window.location.href = '/login';
		}
	};

	const logout = () => [setIsAuthenticated(false)];

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isLoading, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthTaskType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
