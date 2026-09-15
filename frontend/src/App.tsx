import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, closestCorners, type DragEndEvent } from '@dnd-kit/core';
import type { RootState } from './store';
import { setTasks, updateTaskStatus } from './features/projectSlice';
import { KanbanColumn } from './components/KanbanColumn';

// Initialize socket
const socket = io('http://localhost:3000');

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.project.tasks);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join_project', '1'); // Default project
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('task_updated', (data) => {
      if (data.id && data.status) {
        dispatch(updateTaskStatus({ id: data.id, status: data.status }));
      }
    });

    // Mock initial data if empty
    if (tasks.length === 0) {
      dispatch(setTasks([
        { id: '1', title: 'Setup React App', description: 'Initialize Vite + React', status: 'DONE' },
        { id: '2', title: 'Setup Node Backend', description: 'Express + Socket.io', status: 'IN_PROGRESS' },
        { id: '3', title: 'Implement Kanban', description: 'Use dnd-kit for drag and drop', status: 'TODO' },
      ]));
    }

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('task_updated');
    };
  }, [dispatch, tasks.length]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as string;
      
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        // Update local state
        dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
        
        // Emit to server
        socket.emit('task_updated', { id: taskId, status: newStatus, projectId: '1' });
        
        // In a real app, you would also make a REST API call here to persist it in the database
        // fetch(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) })
      }
    }
  };

  const columns = ['TODO', 'IN_PROGRESS', 'DONE'];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Project Management Tool</h1>
          <p className="text-sm text-gray-500 mt-2">
            Real-time updates status: <span className={isConnected ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Try dragging a task to a different column!
        </div>
      </header>

      <main>
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map(column => (
              <KanbanColumn 
                key={column} 
                id={column} 
                title={column.replace('_', ' ')} 
                tasks={tasks.filter(t => t.status === column)} 
              />
            ))}
          </div>
        </DndContext>
      </main>
    </div>
  );
}

export default App;
