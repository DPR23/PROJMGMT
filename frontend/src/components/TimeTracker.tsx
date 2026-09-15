import { useState, useEffect } from 'react';

export default function TimeTracker() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h2 className="text-3xl font-light tracking-tight text-gray-900">Time Tracker</h2>
        <p className="text-sm text-gray-500 mt-1 font-light">Stay focused</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400" />
        
        <div className="text-7xl md:text-8xl font-light tracking-widest font-mono text-gray-800 my-8 tabular-nums">
          {formatTime(seconds)}
        </div>
        
        <div className="flex justify-center space-x-6 mt-10">
          {!isRunning ? (
            <button 
              onClick={() => setIsRunning(true)}
              className="bg-gray-900 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-gray-800 transition-all duration-300"
            >
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          ) : (
            <button 
              onClick={() => setIsRunning(false)}
              className="bg-rose-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-rose-600 transition-all duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
            </button>
          )}
          <button 
            onClick={() => { setIsRunning(false); setSeconds(0); }}
            className="bg-gray-100 text-gray-600 w-20 h-20 rounded-full flex items-center justify-center shadow-sm hover:scale-105 hover:bg-gray-200 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Recent Logs</h3>
        <div className="space-y-2">
          {[1,2,3].map(i => (
            <div key={i} className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
              <div>
                <p className="font-medium text-sm text-gray-800">Design System Updates</p>
                <p className="text-xs text-gray-400 mt-1">Today, 10:00 AM</p>
              </div>
              <span className="font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded-lg text-sm">02:15:00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
