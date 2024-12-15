import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoute';
import TaskList from './components/TaskList';
import { useAppSelector } from './store/store';

const App = () => {
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	return (
		<Router>
			<div className='min-h-screen bg-gray-100'>
				<Routes>
					<Route
						path='/login'
						element={
							isAuthenticated ? (
								<Navigate to='/' replace />
							) : (
								<Login />
							)
						}
					/>
					<Route
						path='/'
						element={
							<ProtectedRoutes>
								<TaskList />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
