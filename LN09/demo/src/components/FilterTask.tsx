import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchQuery } from '../store/task/taskSlice';

const FilterTask: React.FC = () => {
	const dispatch = useDispatch();
	const searchQuery = useSelector(
		(state: RootState) => state.tasks.searchQuery
	);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchQuery(event.target.value));
	};

	return (
		<div className='mb-4'>
			<input
				type='text'
				value={searchQuery}
				onChange={handleSearchChange}
				placeholder='Search tasks...'
				className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>
		</div>
	);
};

export default FilterTask;
