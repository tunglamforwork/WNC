import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<TaskList />
						</ProtectedRoute>
					}
				/>
				<Route path='/' element={<TaskList />} />
			</Routes>
		</Router>
	);
};

export default App;
