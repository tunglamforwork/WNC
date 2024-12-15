import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../libs/api';

interface AuthLoginDto {
	username: string;
	password: string;
}

interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

interface LoginError {
	status: number;
	message: string;
}

export const login = createAsyncThunk<
	LoginResponse,
	AuthLoginDto,
	{ rejectValue: LoginError }
>(
	'auth/login',
	async ({ username, password }: AuthLoginDto, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/login', {
				username,
				password,
			});

			// Check if the response has error status
			if (response.data.error) {
				return rejectWithValue(response.data as LoginError);
			}

			const { accessToken, refreshToken } = response.data;

			// Only store tokens if authentication was successful
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			api.defaults.headers.common[
				'Authorization'
			] = `Bearer ${accessToken}`;

			return response.data;
		} catch (error: any) {
			// Handle axios error
			if (error.response) {
				return rejectWithValue(error.response.data as LoginError);
			}
			// Handle network or other errors
			return rejectWithValue({
				status: 500,
				message: 'Network error or server is unavailable',
			});
		}
	}
);

export const logout = createAsyncThunk<void, void, { rejectValue: LoginError }>(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await api.get('/auth/logout');

			// Remove tokens from localStorage
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			// Remove Authorization header
			delete api.defaults.headers.common['Authorization'];
		} catch (error: any) {
			if (error.response) {
				return rejectWithValue(error.response.data as LoginError);
			}
			return rejectWithValue({
				status: 500,
				message: 'Network error or server is unavailable',
			});
		}
	}
);

interface AuthState {
	user: null | Record<string, any>;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
	isAuthenticated: !!localStorage.getItem('accessToken'),
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.accessToken = null;
				state.refreshToken = null;
				state.error = action.payload?.message || 'Login failed';
				// Clean up any stored tokens on rejection
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				delete api.defaults.headers.common['Authorization'];
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.accessToken = null;
				state.refreshToken = null;
				state.isAuthenticated = false;
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Logout failed';
			});
	},
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
