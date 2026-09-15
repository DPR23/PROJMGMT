import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, closestCorners, type DragEndEvent } from '@dnd-kit/core';
import type { RootState } from '../store';
import { updateTaskStatus, addTask } from '../features/projectSlice';
import { KanbanColumn } from './KanbanColumn';
import CreateTaskModal from './CreateTaskModal';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export function KanbanBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.project.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as string;
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
        socket.emit('task_updated', { id: taskId, status: newStatus, projectId: '1' });
      }
    }
  };

  const handleCreateTask = (taskData: { title: string; description: string; status: string; priority: string }) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
    };
    dispatch(addTask(newTask));
    setIsModalOpen(false);
  };

  const columns = [
    { id: 'TODO', title: 'To Do', color: 'bg-blue-500' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-yellow-500' },
    { id: 'DONE', title: 'Done', color: 'bg-green-500' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>
          <p className="text-sm text-gray-500 mt-1">Drag and drop tasks between columns</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg shadow-blue-200"
        >
          + New Task
        </button>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              tasks={tasks.filter(t => t.status === column.id)}
            />
          ))}
        </div>
      </DndContext>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}
