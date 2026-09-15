export default function GanttChart() {
  const months = ['Sep 1', 'Sep 7', 'Sep 14', 'Sep 21', 'Sep 28'];
  const tasks = [
    { name: 'Research', start: 0, width: 20, color: 'bg-blue-400', progress: 100 },
    { name: 'Design', start: 15, width: 30, color: 'bg-purple-400', progress: 60 },
    { name: 'Development', start: 40, width: 45, color: 'bg-amber-400', progress: 30 },
    { name: 'Testing', start: 70, width: 20, color: 'bg-green-400', progress: 0 },
    { name: 'Review', start: 80, width: 10, color: 'bg-pink-400', progress: 0 },
    { name: 'Launch', start: 90, width: 10, color: 'bg-rose-400', progress: 0 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-light tracking-tight text-gray-900">Timeline</h2>
          <p className="text-sm text-gray-500 mt-1 font-light">Project schedule</p>
        </div>
        <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-50">
          <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-blue-400"/><span className="text-xs text-gray-600">Planning</span></div>
          <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-amber-400"/><span className="text-xs text-gray-600">Execution</span></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="grid grid-cols-12 gap-0 border-b border-gray-100 bg-gray-50/50 p-4">
          <div className="col-span-3 text-sm font-medium text-gray-500">Task</div>
          <div className="col-span-9 flex justify-between text-xs text-gray-400">
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {tasks.map((task, i) => (
            <div key={i} className={`grid grid-cols-12 gap-4 items-center p-2 rounded-xl transition-colors duration-300 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50 hover:bg-gray-50'}`}>
              <div className="col-span-3 text-sm font-medium text-gray-700">{task.name}</div>
              <div className="col-span-9 relative h-8 rounded-full bg-gray-100/50 overflow-hidden">
                <div 
                  className={`absolute top-0 bottom-0 rounded-full ${task.color} transition-all duration-500 flex items-center px-3`}
                  style={{ left: `${task.start}%`, width: `${task.width}%` }}
                >
                  <div className="absolute inset-0 bg-white/20" style={{ width: `${100 - task.progress}%`, right: 0, left: 'auto' }} />
                  {task.progress > 0 && <span className="text-[10px] text-white/90 font-medium relative z-10">{task.progress}%</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
