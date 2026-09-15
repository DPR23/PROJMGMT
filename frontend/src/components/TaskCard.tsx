import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../features/projectSlice';

const priorityDot: Record<string, string> = {
  Urgent: 'bg-red-500',
  High: 'bg-orange-400',
  Medium: 'bg-amber-400',
  Low: 'bg-green-400',
};

export function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
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
      className="bg-white rounded-xl p-4 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md hover:scale-[1.01] transition-all duration-300 border border-gray-100/80"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-800 text-sm">{task.title}</h3>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${priorityDot[task.priority] || 'bg-gray-300'}`} />
          <span className="text-[11px] text-gray-400 font-light">{task.priority}</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 font-light leading-relaxed">{task.description}</p>
    </div>
  );
}
