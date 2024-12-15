import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import {
	deleteTaskById,
	fetchTasks,
	toggleTaskCompletion,
} from '../store/task/taskSlice';
import AddTask from './AddTask';
import FilterTask from './FilterTask';
import LogoutButton from './auth/LogoutButton';

const TaskList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { tasks, searchQuery, isLoading } = useSelector(
		(state: RootState) => state.tasks
	);
	const isAuthenticated = localStorage.getItem('isAuthenticated');
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	const handleToggle = async (id: string) => {
		try {
			await dispatch(toggleTaskCompletion(id)).unwrap();
		} catch (error) {
			console.error('Failed to toggle task:', error);
			// Optionally refetch tasks if the toggle fails
			dispatch(fetchTasks());
		}
	};

	const filteredTasks = Array.isArray(tasks)
		? tasks.filter((task) => {
				if (!task || typeof task.name !== 'string') {
					return false;
				}
				return task.name
					.toLowerCase()
					.includes((searchQuery || '').toLowerCase());
		  })
		: [];

	const handleDelete = (id: string) => {
		dispatch(deleteTaskById(id));
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-32'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			<LogoutButton />
			<FilterTask />
			<AddTask />
			{filteredTasks.length === 0 && searchQuery && (
				<p className='text-gray-500 text-center py-4'>
					No tasks found matching "{searchQuery}"
				</p>
			)}
			<ul className='space-y-2'>
				{filteredTasks.map((task) => (
					<li
						key={task.id}
						className='flex items-center justify-between p-2 border rounded'
					>
						<div className='flex items-center gap-2'>
							<input
								type='checkbox'
								checked={task.completed}
								onChange={() => handleToggle(task.id)}
								className='h-4 w-4'
							/>
							<span
								className={
									task.completed
										? 'line-through text-gray-500'
										: ''
								}
							>
								{task.name}
							</span>
						</div>
						<button
							onClick={() => handleDelete(task.id)}
							className='text-red-500 hover:text-red-700'
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskList;
