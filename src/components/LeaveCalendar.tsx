import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Plus, User, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Leave } from '../types';
import 'react-calendar/dist/Calendar.css';

const LeaveCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddLeave, setShowAddLeave] = useState(false);
  const [leaves, setLeaves] = useState<Leave[]>([
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      startDate: new Date('2024-12-20'),
      endDate: new Date('2024-12-22'),
      reason: 'Christmas vacation',
      status: 'approved',
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      startDate: new Date('2024-12-25'),
      endDate: new Date('2024-12-25'),
      reason: 'Christmas Day',
      status: 'approved',
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      startDate: new Date('2024-12-31'),
      endDate: new Date('2025-01-02'),
      reason: 'New Year break',
      status: 'pending',
    },
  ]);

  const [newLeave, setNewLeave] = useState({
    startDate: new Date(),
    endDate: new Date(),
    reason: '',
  });

  const addLeave = () => {
    if (newLeave.reason.trim()) {
      const leave: Leave = {
        id: Date.now().toString(),
        userId: '1',
        userName: 'Current User',
        startDate: newLeave.startDate,
        endDate: newLeave.endDate,
        reason: newLeave.reason,
        status: 'pending',
      };
      setLeaves([...leaves, leave]);
      setNewLeave({
        startDate: new Date(),
        endDate: new Date(),
        reason: '',
      });
      setShowAddLeave(false);
    }
  };

  const getLeaveForDate = (date: Date) => {
    return leaves.filter(leave => {
      const leaveStart = new Date(leave.startDate);
      const leaveEnd = new Date(leave.endDate);
      return date >= leaveStart && date <= leaveEnd;
    });
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayLeaves = getLeaveForDate(date);
      if (dayLeaves.length > 0) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayLeaves = getLeaveForDate(date);
      if (dayLeaves.length > 0) {
        return 'has-leave';
      }
    }
    return '';
  };

  const selectedDateLeaves = getLeaveForDate(selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Leave Calendar</h1>
        <button
          onClick={() => setShowAddLeave(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Apply for Leave
        </button>
      </div>

      {/* Add Leave Modal */}
      {showAddLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Apply for Leave</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={format(newLeave.startDate, 'yyyy-MM-dd')}
                  onChange={(e) => setNewLeave({ ...newLeave, startDate: new Date(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={format(newLeave.endDate, 'yyyy-MM-dd')}
                  onChange={(e) => setNewLeave({ ...newLeave, endDate: new Date(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <textarea
                  placeholder="Reason for leave"
                  className="input-field"
                  rows={3}
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddLeave(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button onClick={addLeave} className="btn-primary">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="card">
            <style>{`
              .react-calendar {
                width: 100%;
                border: none;
                font-family: inherit;
              }
              .react-calendar__tile {
                position: relative;
                padding: 0.75rem 0.5rem;
                background: none;
                border: none;
                font-size: 0.875rem;
              }
              .react-calendar__tile:hover {
                background-color: #f3f4f6;
              }
              .react-calendar__tile--active {
                background-color: #7c3aed !important;
                color: white;
              }
              .react-calendar__tile.has-leave {
                background-color: #dbeafe;
              }
              .react-calendar__navigation button {
                font-size: 1rem;
                font-weight: 500;
              }
            `}</style>
            <Calendar
              onChange={(value) => {
                if (value instanceof Date) {
                  setSelectedDate(value);
                }
              }}
              value={selectedDate}
              tileContent={tileContent}
              tileClassName={tileClassName}
              showNeighboringMonth={false}
            />
          </div>
        </div>

        {/* Leave Details */}
        <div className="space-y-6">
          {/* Selected Date Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            
            {selectedDateLeaves.length > 0 ? (
              <div className="space-y-3">
                {selectedDateLeaves.map((leave) => (
                  <div key={leave.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{leave.userName}</div>
                      <div className="text-sm text-gray-600">{leave.reason}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {format(leave.startDate, 'MMM d')} - {format(leave.endDate, 'MMM d')}
                      </div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        leave.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : leave.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {leave.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No leaves scheduled for this date.</p>
            )}
          </div>

          {/* Upcoming Leaves */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Leaves</h3>
            <div className="space-y-3">
              {leaves
                .filter(leave => leave.startDate >= new Date())
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                .slice(0, 5)
                .map((leave) => (
                  <div key={leave.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{leave.userName}</div>
                      <div className="text-xs text-gray-500">
                        {format(leave.startDate, 'MMM d')} - {format(leave.endDate, 'MMM d')}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      leave.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : leave.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {leave.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;