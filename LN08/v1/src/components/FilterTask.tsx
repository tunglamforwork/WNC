const FilterTask = ({
	filterTasks,
}: {
	filterTasks: (query: string) => void;
}) => {
	return (
		<div className='w-full flex space-x-2'>
			<input
				type='text'
				placeholder='Search todos...'
				onChange={(e) => filterTasks(e.target.value)}
				className='flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400'
			/>
		</div>
	);
};

export default FilterTask;
