import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, closestCorners, type DragEndEvent } from '@dnd-kit/core';
import type { RootState } from '../store';
import { updateTaskStatus, addTask } from '../features/projectSlice';
import CreateTaskModal from './CreateTaskModal';
import { KanbanColumn } from './KanbanColumn';

export function KanbanBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.project.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    if (!over) return;
    const taskId = event.active.id as string;
    const newStatus = over.id as string;
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
    }
  };

  const handleCreateTask = (taskData: { title: string; description: string; status: string; priority: string }) => {
    dispatch(addTask({ id: Date.now().toString(), ...taskData }));
    setIsModalOpen(false);
  };

  const columns = [
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'DONE', title: 'Done' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-light tracking-tight text-gray-900">Board</h2>
          <p className="text-sm text-gray-500 mt-1 font-light">Drag and drop to organize your workflow</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
        >
          + New Task
        </button>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={tasks.filter(t => t.status === col.id)}
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
