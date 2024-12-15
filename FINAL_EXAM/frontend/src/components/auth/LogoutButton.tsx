import React from 'react';
import { logout } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const LogoutButton: React.FC = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.auth.loading);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div>
			<button
				onClick={handleLogout}
				disabled={loading}
				style={{
					padding: '10px 20px',
					backgroundColor: '#FF4C4C',
					color: 'white',
					border: 'none',
					borderRadius: '5px',
					cursor: loading ? 'not-allowed' : 'pointer',
				}}
			>
				{loading ? 'Logging out...' : 'Logout'}
			</button>
		</div>
	);
};

export default LogoutButton;
