import { useState, useEffect } from 'react';

type TaskLog = {
  id: string;
  task: string;
  duration: string;
  startedAt: string;
  status: 'Running' | 'Stopped';
};

const MOCK_TASKS = [
  'Project Setup',
  'UI Design',
  'Backend API',
  'Database Schema',
  'Testing',
  'Deployment'
];

const MOCK_LOGS: TaskLog[] = [
  { id: '1', task: 'UI Design', duration: '02:15:00', startedAt: '09:00 AM', status: 'Stopped' },
  { id: '2', task: 'Project Setup', duration: '01:30:00', startedAt: '11:30 AM', status: 'Stopped' },
  { id: '3', task: 'Backend API', duration: '00:45:00', startedAt: '02:00 PM', status: 'Stopped' },
  { id: '4', task: 'Database Schema', duration: '03:00:00', startedAt: '03:15 PM', status: 'Stopped' }
];

const WEEKLY_DATA = [
  { day: 'Mon', hours: 6, max: 8 },
  { day: 'Tue', hours: 7.5, max: 8 },
  { day: 'Wed', hours: 5, max: 8 },
  { day: 'Thu', hours: 8, max: 8 },
  { day: 'Fri', hours: 4.5, max: 8 },
  { day: 'Sat', hours: 2, max: 8 },
  { day: 'Sun', hours: 0, max: 8 },
];

export default function TimeTracker() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState(MOCK_TASKS[0]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0 && interval !== null) {
      clearInterval(interval);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const stopTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 bg-gray-50 min-h-screen text-gray-800">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-700">Time Tracker</h1>
        
        <div className="w-full max-w-md">
          <label htmlFor="task-select" className="block text-sm font-medium text-gray-600 mb-2">Select Task</label>
          <select 
            id="task-select"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2.5 border"
          >
            {MOCK_TASKS.map(task => (
              <option key={task} value={task}>{task}</option>
            ))}
          </select>
        </div>

        <div className="text-6xl md:text-8xl font-mono font-light tracking-wider text-gray-800 my-4">
          {formatTime(seconds)}
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-full text-white font-medium shadow-md transition-transform hover:scale-105 active:scale-95 ${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={stopTimer}
            className="px-8 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            Stop
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-700">Today's Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Task</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Started At</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_LOGS.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{log.task}</td>
                  <td className="p-4 font-mono text-gray-600">{log.duration}</td>
                  <td className="p-4 text-gray-500">{log.startedAt}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">Weekly Summary</h2>
        <div className="space-y-4">
          {WEEKLY_DATA.map((data) => (
            <div key={data.day} className="flex items-center">
              <span className="w-12 text-sm font-medium text-gray-500">{data.day}</span>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden mx-4 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(data.hours / data.max) * 100}%` }}
                />
              </div>
              <span className="w-16 text-sm text-right font-medium text-gray-600">{data.hours}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
