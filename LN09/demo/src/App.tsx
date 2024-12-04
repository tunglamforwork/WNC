import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import TaskList from './components/TaskList';
const App = () => {
	return (
		<div>
			<BrowserRouter>
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
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
