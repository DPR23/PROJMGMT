import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setTasks, updateTaskStatus } from './features/projectSlice';

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
      // data from other users
      if (data.id && data.status) {
        dispatch(updateTaskStatus({ id: data.id, status: data.status }));
      }
    });

    // Mock initial data
    dispatch(setTasks([
      { id: '1', title: 'Setup React App', description: 'Initialize Vite + React', status: 'DONE' },
      { id: '2', title: 'Setup Node Backend', description: 'Express + Socket.io', status: 'IN_PROGRESS' },
      { id: '3', title: 'Implement Kanban', description: 'Use dnd-kit for drag and drop', status: 'TODO' },
    ]));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('task_updated');
    };
  }, [dispatch]);

  const handleStatusChange = (id: string, newStatus: string) => {
    dispatch(updateTaskStatus({ id, status: newStatus }));
    socket.emit('task_updated', { id, status: newStatus, projectId: '1' });
  };

  const columns = ['TODO', 'IN_PROGRESS', 'DONE'];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Project Management Tool</h1>
        <p className="text-sm text-gray-500 mt-2">
          Real-time updates status: <span className={isConnected ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </p>
      </header>

      <main>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map(column => (
            <div key={column} className="bg-gray-200 rounded-lg p-4 w-80 flex-shrink-0 min-h-[500px]">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">{column.replace('_', ' ')}</h2>
              <div className="space-y-4">
                {tasks.filter(t => t.status === column).map(task => (
                  <div key={task.id} className="bg-white p-4 rounded shadow cursor-pointer border border-gray-200">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                    
                    {/* Temp controls for testing socket update */}
                    <div className="mt-4 flex gap-2">
                      {columns.filter(c => c !== column).map(c => (
                        <button 
                          key={c}
                          onClick={() => handleStatusChange(task.id, c)}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                        >
                          Move to {c}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
