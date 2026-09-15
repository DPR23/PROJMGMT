import { useDroppable } from '@dnd-kit/core';
import type { Task } from '../features/projectSlice';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-200 rounded-lg p-4 w-80 flex-shrink-0 min-h-[500px] transition-colors ${
        isOver ? 'bg-gray-300' : ''
      }`}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="space-y-4 flex flex-col min-h-[400px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
