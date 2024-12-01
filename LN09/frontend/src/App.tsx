import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';

const App = () => {
	const isAuthenticated = localStorage.getItem('isAuthenticated');
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
							isAuthenticated ? (
								<TaskList />
							) : (
								<Navigate to='/login' replace />
							)
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
