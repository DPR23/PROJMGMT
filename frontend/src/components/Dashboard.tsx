export default function Dashboard() {
  const stats = [
    { label: 'Total Tasks', value: '12', color: 'border-blue-500', icon: '📋' },
    { label: 'In Progress', value: '4', color: 'border-yellow-500', icon: '⏳' },
    { label: 'Completed', value: '6', color: 'border-green-500', icon: '✅' },
    { label: 'Overdue', value: '2', color: 'border-red-500', icon: '⚠️' },
  ];

  const activities = [
    { id: 1, text: 'Task "Setup React" moved to Done', time: '2h ago', icon: '🔄' },
    { id: 2, text: 'Dishant commented on "API Integration"', time: '4h ago', icon: '💬' },
    { id: 3, text: 'New task "Design Review" assigned to you', time: '1d ago', icon: '📌' },
    { id: 4, text: 'Task "Database Schema" moved to In Progress', time: '1d ago', icon: '🔄' },
  ];

  const deadlines = [
    { id: 1, task: 'Finish Authentication', project: 'Core Platform', time: 'Today, 5:00 PM', urgency: 'red' },
    { id: 2, task: 'Review Pull Requests', project: 'Frontend', time: 'Tomorrow, 12:00 PM', urgency: 'yellow' },
    { id: 3, task: 'Weekly Team Sync', project: 'Management', time: 'Friday, 10:00 AM', urgency: 'green' },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Dishant! 👋</h1>
        <p className="text-gray-500 mt-2">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${stat.color} hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className="text-3xl opacity-80">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-lg">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">{activity.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {deadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${getUrgencyColor(deadline.urgency)} shadow-sm`} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{deadline.task}</p>
                      <p className="text-xs text-gray-500 mt-1">{deadline.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">{deadline.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
