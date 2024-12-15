import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addNewTask } from '../store/task/taskSlice';

interface ITaskFormData {
	name: string;
}

const AddTask: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ITaskFormData>();

	const onSubmit = async (data: ITaskFormData) => {
		try {
			// Create the new task object
			const newTask = {
				name: data.name,
			};

			// Dispatch the addNewTask action to add the task to the server and update the Redux state
			const actionResult = await dispatch(addNewTask(newTask));

			// Check if the task was successfully added
			if (addNewTask.fulfilled.match(actionResult)) {
				reset(); // Reset the form if task is added successfully
			} else {
				console.error('Failed to add task');
			}
		} catch (error) {
			console.error('Failed to add task:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
			<div className='flex gap-2'>
				<input
					{...register('name', {
						required: 'Task text is required',
						minLength: {
							value: 3,
							message: 'Task must be at least 3 characters',
						},
					})}
					placeholder='Add a new task'
					className='flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
				>
					Add
				</button>
			</div>
			{errors.name && (
				<p className='text-red-500 text-sm mt-1'>
					{errors.name.message}
				</p>
			)}
		</form>
	);
};

export default AddTask;
