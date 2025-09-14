import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import Dashboard from './Dashboard';
import TaskAllotment from './TaskAllotment';
import Timeline from './Timeline';
import LeaveCalendar from './LeaveCalendar';
import FlowChart from './FlowChart';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tasks', label: 'Task Allotment' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'leave', label: 'Leave Calendar' },
    { id: 'flow', label: 'Flow and Process Chart' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskAllotment />;
      case 'timeline':
        return <Timeline />;
      case 'leave':
        return <LeaveCalendar />;
      case 'flow':
        return <FlowChart />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Collab AIG 13</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'tab-active'
                    : 'tab-inactive border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Layout;