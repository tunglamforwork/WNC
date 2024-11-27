import { useState } from 'react';

const AddTask = ({ addTodo }: { addTodo: (name: string) => void }) => {
	const [inputValue, setInputValue] = useState('');
	const onAddTodo = () => {
		addTodo(inputValue);
		setInputValue('');
	};
	return (
		<div className='w-full flex space-x-2'>
			<input
				type='text'
				placeholder='Enter a todo...'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className='flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400'
				required
			/>
			<button
				onClick={onAddTodo}
				className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow'
			>
				Add
			</button>
		</div>
	);
};

export default AddTask;
