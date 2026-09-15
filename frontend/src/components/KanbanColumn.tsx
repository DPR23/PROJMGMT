import { useDroppable } from '@dnd-kit/core';
import type { Task } from '../features/projectSlice';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const columnIcons: Record<string, string> = {
  TODO: '📋',
  IN_PROGRESS: '🔧',
  DONE: '✅',
};

export function KanbanColumn({ id, title, tasks, color }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl p-4 w-80 flex-shrink-0 min-h-[500px] transition-all duration-200 ${
        isOver ? 'bg-blue-50 ring-2 ring-blue-300' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span>{columnIcons[id] || '📌'}</span>
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{title}</h2>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${color}`}>
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
