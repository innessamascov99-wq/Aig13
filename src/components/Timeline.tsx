import React, { useState } from 'react';
import { Calendar, Plus, Edit3 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

interface TimelineTask {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  color: string;
}

const Timeline: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<TimelineTask[]>([
    {
      id: '1',
      title: 'Business proposal plan',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-02-28'),
      progress: 100,
      color: '#10B981',
    },
    {
      id: '2',
      title: 'GTM marketing motion strategy',
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-03-15'),
      progress: 100,
      color: '#10B981',
    },
    {
      id: '3',
      title: 'Set up key metrics',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-03-10'),
      progress: 100,
      color: '#10B981',
    },
    {
      id: '4',
      title: 'Business strategy and planning',
      startDate: new Date('2024-02-10'),
      endDate: new Date('2024-02-25'),
      progress: 100,
      color: '#10B981',
    },
    {
      id: '5',
      title: 'Trip management frontend',
      startDate: new Date('2024-02-20'),
      endDate: new Date('2024-04-15'),
      progress: 75,
      color: '#3B82F6',
    },
    {
      id: '6',
      title: 'Announcement email',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-04-10'),
      progress: 60,
      color: '#3B82F6',
    },
    {
      id: '7',
      title: 'Campaign email - tier 2',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-05-01'),
      progress: 40,
      color: '#60A5FA',
    },
    {
      id: '8',
      title: 'License renewal for dashboard',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-20'),
      progress: 30,
      color: '#60A5FA',
    },
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTaskPosition = (task: TimelineTask) => {
    const totalDays = days.length;
    const taskStart = Math.max(0, Math.floor((task.startDate.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)));
    const taskEnd = Math.min(totalDays, Math.ceil((task.endDate.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)));
    const duration = taskEnd - taskStart;
    
    return {
      left: `${(taskStart / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Timeline</h1>
        <div className="flex items-center space-x-4">
          <button className="btn-secondary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
          <div className="text-sm text-gray-600">
            {format(currentDate, 'MMMM yyyy')}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header with dates */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="flex">
            <div className="w-64 px-6 py-4 font-medium text-gray-900 border-r border-gray-200">
              Task
            </div>
            <div className="flex-1 relative">
              <div className="flex">
                {['JAN', 'FEB', 'MAR', 'APR', 'MAY'].map((month, index) => (
                  <div key={month} className="flex-1 px-4 py-4 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0">
                    {month}
                  </div>
                ))}
              </div>
              {/* Today indicator */}
              <div className="absolute top-0 bottom-0 w-px bg-red-500" style={{ left: '20%' }}>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs text-red-500 font-medium">
                  Today
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task rows */}
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div key={task.id} className="flex hover:bg-gray-50">
              <div className="w-64 px-6 py-4 border-r border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: task.color }} />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-500">GTM-{task.id.padStart(2, '0')}</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative py-4 px-4">
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 h-6 rounded-full flex items-center"
                  style={{
                    ...getTaskPosition(task),
                    backgroundColor: task.color,
                  }}
                >
                  <div className="text-xs text-white font-medium px-2 truncate">
                    {task.progress}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
          <span className="text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-300 rounded-full mr-2" />
          <span className="text-gray-600">Planned</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-2" />
          <span className="text-gray-600">Not Started</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;