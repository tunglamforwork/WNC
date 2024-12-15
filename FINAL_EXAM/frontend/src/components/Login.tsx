import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/auth/authSlice';
import type { AppDispatch, RootState } from '../store/store';

interface ILoginFormData {
	username: string;
	password: string;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginFormData>();

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { loading, error } = useSelector((state: RootState) => state.auth);

	const onSubmit = async (credentials: ILoginFormData) => {
		try {
			const result = await dispatch(login(credentials)).unwrap();
			if (result.accessToken) {
				navigate('/');
			}
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-6'>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<div>
					<input
						{...register('username', {
							required: 'Username is required',
						})}
						type='text'
						placeholder='Username'
						className='w-full p-2 border rounded'
					/>
					{errors.username && (
						<p className='text-red-500 text-sm'>
							{errors.username.message}
						</p>
					)}
				</div>
				<div>
					<input
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message:
									'Password must be at least 6 characters',
							},
						})}
						type='password'
						placeholder='Password'
						className='w-full p-2 border rounded'
					/>
					{errors.password && (
						<p className='text-red-500 text-sm'>
							{errors.password.message}
						</p>
					)}
				</div>

				{error && <p className='text-red-500 text-sm'>{error}</p>}

				<button
					type='submit'
					disabled={loading}
					className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
				>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Login;
