import { useDroppable } from '@dnd-kit/core';
import type { Task } from '../features/projectSlice';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export function KanbanColumn({ id, title, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-5 min-h-[480px] transition-all duration-300 ${
        isOver
          ? 'bg-blue-50/60 ring-2 ring-blue-200/60'
          : 'bg-white/40 backdrop-blur-sm border border-gray-100/60'
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-16 text-gray-300 text-sm font-light border-2 border-dashed border-gray-100 rounded-xl">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
