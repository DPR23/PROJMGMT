import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string; // 'TODO', 'IN_PROGRESS', 'DONE'
}

export interface ProjectState {
  tasks: Task[];
  loading: boolean;
}

const initialState: ProjectState = {
  tasks: [],
  loading: false,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { setTasks, addTask, updateTaskStatus, updateTask } = projectSlice.actions;
export default projectSlice.reducer;
