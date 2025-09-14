import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const summaryData = [
    {
      title: 'Tasks Done',
      value: '12',
      subtitle: 'in the last 7 days',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Task Pending',
      value: '10',
      subtitle: 'in the last 7 days',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Update Required',
      value: '4',
      subtitle: 'in the last 7 days',
      icon: AlertTriangle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Due Tasks',
      value: '3',
      subtitle: 'in the next 7 days',
      icon: Calendar,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const pieData = [
    { name: 'Done', value: 24, color: '#10B981' },
    { name: 'In progress', value: 25, color: '#3B82F6' },
    { name: 'To do', value: 18, color: '#F59E0B' },
    { name: 'In review', value: 12, color: '#EF4444' },
  ];

  const teamData = [
    { name: 'Unassigned', workload: 19, count: 25, color: '#6B7280' },
    { name: 'Amar Sundaram', workload: 27, count: 25, color: '#F59E0B' },
    { name: 'Eva Lien', workload: 22, count: 20, color: '#EF4444' },
    { name: 'Alana Song', workload: 15, count: 14, color: '#3B82F6' },
    { name: 'Jia Yang', workload: 9, count: 12, color: '#10B981' },
    { name: 'Fran Perez', workload: 8, count: 8, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex items-center">
        <span className="text-2xl mr-2">👋</span>
        <h1 className="text-2xl font-semibold text-gray-900">
          {getGreeting()}, {user?.name}
        </h1>
      </div>

      <p className="text-gray-600">
        Here's where you'll get a summary of the projects included in your overview.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${item.bgColor} mr-4`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                    <span className="ml-2 text-sm font-medium text-gray-600">{item.title.toLowerCase()}</span>
                  </div>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Summary Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status summary</h3>
          <p className="text-sm text-gray-600 mb-6">
            Get a snapshot of the status of your items. View more details.
          </p>
          
          <div className="flex items-center">
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="ml-8 space-y-3">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700 mr-2">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 mr-2">Total</span>
                  <span className="text-sm font-bold text-gray-900">79</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Workload */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team workload</h3>
          <p className="text-sm text-gray-600 mb-6">
            Oversee the capacity of your local teams. Re-assign tasks across your team.
          </p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
              <span>Assignee</span>
              <span>Work distribution</span>
              <span>Count</span>
            </div>
            
            {teamData.map((member, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-gray-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm text-gray-900">{member.name}</span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${member.workload}%`,
                        backgroundColor: member.color,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{member.workload}%</span>
                </div>
                
                <span className="text-sm font-medium text-gray-900">{member.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;