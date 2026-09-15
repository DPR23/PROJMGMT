import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export interface ProjectState {
  tasks: Task[];
  loading: boolean;
}

const initialState: ProjectState = {
  tasks: [
    { id: '1', title: 'Setup React App', description: 'Initialize Vite + React with Tailwind CSS', status: 'DONE', priority: 'High' },
    { id: '2', title: 'Design Database Schema', description: 'Create Prisma models for Users, Projects, Tasks', status: 'DONE', priority: 'High' },
    { id: '3', title: 'Build REST API', description: 'Express endpoints for CRUD operations', status: 'IN_PROGRESS', priority: 'High' },
    { id: '4', title: 'Implement Socket.io', description: 'Real-time updates for task changes', status: 'IN_PROGRESS', priority: 'Medium' },
    { id: '5', title: 'Kanban Board UI', description: 'Drag and drop task management board', status: 'IN_PROGRESS', priority: 'High' },
    { id: '6', title: 'User Authentication', description: 'JWT-based login and signup flow', status: 'TODO', priority: 'Urgent' },
    { id: '7', title: 'File Upload System', description: 'Allow attaching files to tasks', status: 'TODO', priority: 'Medium' },
    { id: '8', title: 'Gantt Chart View', description: 'Timeline visualization for project planning', status: 'TODO', priority: 'Low' },
    { id: '9', title: 'Email Notifications', description: 'Send deadline reminders via email', status: 'TODO', priority: 'Low' },
    { id: '10', title: 'Deploy to Production', description: 'Setup CI/CD and deploy', status: 'TODO', priority: 'Medium' },
    { id: '11', title: 'Write Unit Tests', description: 'Jest tests for API and components', status: 'IN_PROGRESS', priority: 'Medium' },
    { id: '12', title: 'Mobile Responsive Design', description: 'Ensure app works on all screen sizes', status: 'TODO', priority: 'Low' },
  ],
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
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTaskStatus, updateTask, deleteTask } = projectSlice.actions;
export default projectSlice.reducer;
