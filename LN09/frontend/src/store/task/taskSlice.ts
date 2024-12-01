import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITask } from '../../types/task';

interface TaskState {
	tasks: ITask[];
	searchQuery: string;
	isLoading: boolean;
}

const initialState: TaskState = {
	tasks: [],
	searchQuery: '',
	isLoading: false,
};

// Async Thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	const response = await axios.get('http://localhost:3001/task');
	return response.data;
});

export const addNewTask = createAsyncThunk(
	'tasks/addTask',
	async (newTask: { name: string }) => {
		const response = await axios.post(
			'http://localhost:3001/task',
			newTask
		);
		return response.data;
	}
);

export const deleteTaskById = createAsyncThunk(
	'tasks/deleteTask',
	async (taskId: string) => {
		await axios.delete(`http://localhost:3001/task/${taskId}`);
		return taskId;
	}
);

export const toggleTaskCompletion = createAsyncThunk(
	'tasks/toggleTask',
	async (taskId: string, { getState }) => {
		const state = getState() as { tasks: TaskState };
		const task = state.tasks.tasks.find((t) => t.id === taskId);

		if (!task) {
			throw new Error('Task not found');
		}

		// Optimistically update the UI first
		const updatedTask = {
			...task,
			completed: !task.completed,
		};

		const response = await axios.patch(
			`http://localhost:3001/task/${taskId}`,
			updatedTask
		);

		return response.data;
	}
);

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch Tasks
			.addCase(fetchTasks.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state) => {
				state.isLoading = false;
			})
			// Add Task
			.addCase(addNewTask.fulfilled, (state, action) => {
				state.tasks.push(action.payload);
			})
			// Delete Task
			.addCase(deleteTaskById.fulfilled, (state, action) => {
				state.tasks = state.tasks.filter(
					(task) => task.id !== action.payload
				);
			})
			.addCase(toggleTaskCompletion.fulfilled, (state, action) => {
				const index = state.tasks.findIndex(
					(task) => task.id === action.payload.id
				);
				if (index !== -1) {
					state.tasks[index] = action.payload;
				}
			});
	},
});

export const { setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;
