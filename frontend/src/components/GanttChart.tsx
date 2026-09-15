import { useMemo } from 'react';

type TaskStatus = 'Complete' | 'In Progress' | 'Not Started';

type GanttTask = {
  id: string;
  name: string;
  startDay: number; // 1-30
  endDay: number; // 1-30
  color: string;
  status: TaskStatus;
  progress: number; // 0-100
};

const MOCK_TASKS: GanttTask[] = [
  { id: '1', name: 'Project Setup', startDay: 1, endDay: 5, color: 'blue', status: 'Complete', progress: 100 },
  { id: '2', name: 'UI Design', startDay: 3, endDay: 10, color: 'purple', status: 'Complete', progress: 100 },
  { id: '3', name: 'Backend API', startDay: 8, endDay: 18, color: 'green', status: 'In Progress', progress: 60 },
  { id: '4', name: 'Database Schema', startDay: 10, endDay: 14, color: 'yellow', status: 'In Progress', progress: 80 },
  { id: '5', name: 'Testing', startDay: 15, endDay: 22, color: 'orange', status: 'Not Started', progress: 0 },
  { id: '6', name: 'Deployment', startDay: 20, endDay: 25, color: 'red', status: 'Not Started', progress: 0 },
];

const STATUS_COLORS: Record<TaskStatus, { bg: string, text: string }> = {
  'Complete': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'In Progress': { bg: 'bg-green-100', text: 'text-green-800' },
  'Not Started': { bg: 'bg-gray-100', text: 'text-gray-800' }
};

const TASK_COLORS: Record<string, { base: string, fill: string }> = {
  'blue': { base: 'bg-blue-200 text-blue-900', fill: 'bg-blue-400' },
  'purple': { base: 'bg-purple-200 text-purple-900', fill: 'bg-purple-400' },
  'green': { base: 'bg-green-200 text-green-900', fill: 'bg-green-400' },
  'yellow': { base: 'bg-yellow-200 text-yellow-900', fill: 'bg-yellow-400' },
  'orange': { base: 'bg-orange-200 text-orange-900', fill: 'bg-orange-400' },
  'red': { base: 'bg-red-200 text-red-900', fill: 'bg-red-400' },
};

export default function GanttChart() {
  const daysInMonth = 30;
  const daysArray = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Timeline - September</h1>
        
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium">Complete</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span className="text-sm font-medium">Not Started</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-1 shadow-sm">
        {/* Left Column - Task Names */}
        <div className="w-48 flex-shrink-0 bg-gray-50 border-r border-gray-200 z-10 flex flex-col">
          <div className="h-12 border-b border-gray-200 flex items-center px-4 font-semibold text-gray-600 bg-gray-100">
            Task
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            {MOCK_TASKS.map((task, idx) => (
              <div 
                key={task.id} 
                className={`h-16 px-4 flex flex-col justify-center border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <span className="font-medium text-sm truncate" title={task.name}>{task.name}</span>
                <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full w-max ${STATUS_COLORS[task.status].bg} ${STATUS_COLORS[task.status].text}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Timeline Grid */}
        <div className="flex-1 overflow-x-auto flex flex-col relative">
          {/* Header Row */}
          <div className="h-12 border-b border-gray-200 flex min-w-max bg-gray-100">
            {daysArray.map((day) => (
              <div 
                key={day} 
                className="w-10 flex-shrink-0 border-r border-gray-200 flex items-center justify-center text-xs font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid Area */}
          <div className="flex-1 min-w-max relative flex flex-col bg-white">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex pointer-events-none">
              {daysArray.map((day) => (
                <div key={day} className="w-10 flex-shrink-0 border-r border-gray-100 h-full"></div>
              ))}
            </div>

            {/* Task Rows */}
            {MOCK_TASKS.map((task, idx) => {
              const rowClasses = idx % 2 === 0 ? 'bg-transparent' : 'bg-gray-50/50';
              const duration = task.endDay - task.startDay + 1;
              const leftOffset = (task.startDay - 1) * 40; // 40px per day (w-10 = 2.5rem = 40px)
              const width = duration * 40;

              return (
                <div key={task.id} className={`h-16 border-b border-gray-100 relative w-[1200px] ${rowClasses}`}>
                  {/* Task Bar */}
                  <div 
                    className={`absolute top-3 bottom-3 rounded-md shadow-sm overflow-hidden flex items-center px-2 text-xs font-semibold z-10 transition-transform hover:scale-[1.02] cursor-pointer ${TASK_COLORS[task.color].base}`}
                    style={{ left: `${leftOffset}px`, width: `${width}px` }}
                  >
                    {/* Progress Fill */}
                    <div 
                      className={`absolute top-0 left-0 h-full ${TASK_COLORS[task.color].fill} opacity-50`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                    
                    {/* Task Content */}
                    <span className="relative z-10 truncate">{task.name} {task.progress > 0 && `(${task.progress}%)`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
