import { useState } from 'react';
import AddTask from './components/AddTask';
import FilterTask from './components/FilterTask';
import TaskList from './components/TaskList';

export interface ITodo {
	id: string;
	name: string;
	done: boolean;
}

function App() {
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	const addTodo = (name: string) => {
		const newTodo: ITodo = {
			id: Date.now().toString(),
			name: name,
			done: false,
		};
		setTodos((prev) => [...prev, newTodo]);
	};

	const removeTodo = (id: string) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	const markAsComplete = (id: string) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, done: !todo.done } : todo
			)
		);
	};

	const filteredTodos = todos.filter((todo) =>
		todo.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filterTasks = (query: string) => {
		setSearchQuery(query);
	};

	return (
		<div className='w-full max-w-2xl flex flex-col items-center space-y-6'>
			<h1 className='text-2xl font-bold text-gray-700'>Todo App</h1>

			{/* Search Input */}
			<FilterTask filterTasks={filterTasks} />

			{/* Add Todo Input */}
			<AddTask addTodo={addTodo} />
			{/* Todo List */}
			<TaskList
				todos={filteredTodos}
				markAsComplete={markAsComplete}
				removeTodo={removeTodo}
			/>
		</div>
	);
}

export default App;
