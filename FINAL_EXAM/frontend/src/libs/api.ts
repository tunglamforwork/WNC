import axios from 'axios';

// Create axios instance
const api = axios.create({
	baseURL: 'http://localhost:3001/api',
	withCredentials: true,
});

// Add interceptor to handle token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const refreshToken = localStorage.getItem('refreshToken');
				const response = await api.post('/auth/refresh', {
					refreshToken,
				});
				const { accessToken, refreshToken: newRefreshToken } =
					response.data;

				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', newRefreshToken);

				api.defaults.headers.common[
					'Authorization'
				] = `Bearer ${accessToken}`;
				originalRequest.headers[
					'Authorization'
				] = `Bearer ${accessToken}`;

				return api(originalRequest);
			} catch (error) {
				// If refresh fails, logout user
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				window.location.href = '/login';
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

export { api };
