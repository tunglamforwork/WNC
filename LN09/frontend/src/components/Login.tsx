import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface ILoginFormData {
	email: string;
	password: string;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginFormData>();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (credentials: ILoginFormData) => {
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
				localStorage.setItem('isAuthenticated', 'true');
				navigate('/');
			}
		} catch (error) {
			console.error('Login failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-6'>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<div>
					<input
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						})}
						type='email'
						placeholder='Email'
						className='w-full p-2 border rounded'
					/>
					{errors.email && (
						<p className='text-red-500 text-sm'>
							{errors.email.message}
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
				<button
					type='submit'
					disabled={isLoading}
					className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
				>
					{isLoading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Login;
