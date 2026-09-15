import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: '◐' },
    { name: 'Kanban', path: '/kanban', icon: '▦' },
    { name: 'Gantt', path: '/gantt', icon: '▬' },
    { name: 'Time', path: '/time', icon: '◷' },
  ];

  return (
    <div className="flex h-screen bg-gray-50/50">
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-100 flex flex-col transition-all duration-300">
        <div className="p-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent tracking-tight">ProjectFlow</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6">
          <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-2xl border border-gray-100 hover:shadow-sm transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
              DR
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Dishant Rai</p>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
