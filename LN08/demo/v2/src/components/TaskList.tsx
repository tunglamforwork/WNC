import { ITodo } from '../App';

const TaskList = ({
	todos,
	markAsComplete,
	removeTodo,
}: {
	todos: ITodo[];
	markAsComplete: (id: string) => void;
	removeTodo: (id: string) => void;
}) => {
	return (
		<div className='w-full space-y-2'>
			{todos.length > 0 ? (
				todos.map((todo) => (
					<div
						key={todo.id}
						className='flex justify-between items-center border rounded px-3 py-2 bg-gray-50'
					>
						<span
							className={`flex-1 text-lg ${
								todo.done
									? 'line-through text-gray-500'
									: 'text-gray-800'
							}`}
						>
							{todo.name}
						</span>
						<div className='flex space-x-2'>
							<button
								onClick={() => markAsComplete(todo.id)}
								className={`px-3 py-1 rounded shadow ${
									todo.done
										? 'bg-gray-400 hover:bg-gray-500 text-white'
										: 'bg-green-500 hover:bg-green-600 text-white'
								}`}
							>
								{todo.done ? 'Undo' : 'Done'}
							</button>
							<button
								onClick={() => removeTodo(todo.id)}
								className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow'
							>
								Delete
							</button>
						</div>
					</div>
				))
			) : (
				<p className='text-gray-500 text-center'>No todos found!</p>
			)}
		</div>
	);
};

export default TaskList;
