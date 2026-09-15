import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../features/projectSlice';

interface TaskCardProps {
  task: Task;
}

const priorityColors: Record<string, string> = {
  Urgent: 'border-l-red-500 bg-red-50',
  High: 'border-l-orange-500 bg-orange-50',
  Medium: 'border-l-yellow-500 bg-yellow-50',
  Low: 'border-l-green-500 bg-green-50',
};

const priorityBadge: Record<string, string> = {
  Urgent: 'bg-red-100 text-red-700',
  High: 'bg-orange-100 text-orange-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-4 rounded-lg shadow-sm cursor-grab active:cursor-grabbing border-l-4 hover:shadow-md transition-all duration-200 ${priorityColors[task.priority] || 'bg-white border-l-gray-300'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-sm">{task.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityBadge[task.priority] || 'bg-gray-100 text-gray-600'}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{task.description}</p>
    </div>
  );
}
