import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import CreateTaskModal from './CreateTaskModal';

export default function Layout() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Kanban Board', path: '/kanban', icon: '📋' },
    { name: 'Gantt Chart', path: '/gantt', icon: '📈' },
    { name: 'Time Tracking', path: '/time', icon: '⏱️' },
  ];

  const getPageTitle = () => {
    const item = navItems.find((nav) => nav.path === location.pathname);
    return item ? item.name : 'Dashboard';
  };

  const handleCreateTask = (task: { title: string; description: string; status: string; priority: string }) => {
    console.log('New task created:', task);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ProjectFlow
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>➕</span> New Task
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-10 sticky top-0">
          <h2 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md cursor-pointer">
              DR
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}
