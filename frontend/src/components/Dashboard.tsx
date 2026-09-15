export default function Dashboard() {
  const stats = [
    { label: 'Total Tasks', value: 12, dot: 'bg-blue-500' },
    { label: 'In Progress', value: 4, dot: 'bg-amber-500' },
    { label: 'Completed', value: 6, dot: 'bg-green-500' },
    { label: 'Overdue', value: 2, dot: 'bg-red-500' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-4xl font-light tracking-tight text-gray-900">Good evening, Dishant</h1>
        <p className="text-lg text-gray-500 font-light">Here's what's happening with your projects</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 border border-gray-50">
            <div className="flex items-center space-x-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${stat.dot}`} />
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
            <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
          <h2 className="text-xl font-medium tracking-tight mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="pl-4 border-l-2 border-gray-100 hover:border-blue-200 transition-colors duration-300">
                <p className="text-gray-800 font-medium text-sm">Updated design system for mobile</p>
                <p className="text-gray-400 text-xs mt-1">2 hours ago • Design Team</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
          <h2 className="text-xl font-medium tracking-tight mb-6">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-300">
                <div>
                  <p className="text-gray-800 font-medium text-sm">Frontend Architecture Review</p>
                  <p className="text-gray-500 text-xs mt-1">ProjectFlow V2</p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white border border-gray-100 shadow-sm text-xs font-medium text-red-500">
                  Tomorrow
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
