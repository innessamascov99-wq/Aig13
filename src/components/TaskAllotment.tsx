import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreHorizontal, Calendar, User } from 'lucide-react';
import { Task } from '../types';

const TaskAllotment: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Reduce JavaScript execution time',
      description: 'Optimize performance',
      status: 'backlog',
      assignees: [{ id: '1', name: 'Trevor', email: 'trevor@example.com' }],
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Add image ideas',
      description: 'Design task',
      status: 'todo',
      assignees: [],
      priority: 'medium',
      dueDate: new Date('2024-09-30'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Efficiently encode images',
      description: 'Technical optimization',
      status: 'in-progress',
      assignees: [{ id: '2', name: 'Jules', email: 'jules@example.com' }],
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      title: 'Setting up email services for subscription',
      description: 'Backend integration',
      status: 'done',
      assignees: [{ id: '3', name: 'Nancy', email: 'nancy@example.com' }],
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'backlog' as Task['status'],
  });

  const columns = [
    { id: 'backlog', title: 'Backlog', count: tasks.filter(t => t.status === 'backlog').length },
    { id: 'todo', title: 'To do', count: tasks.filter(t => t.status === 'todo').length },
    { id: 'in-progress', title: 'In progress', count: tasks.filter(t => t.status === 'in-progress').length },
    { id: 'done', title: 'Done', count: tasks.filter(t => t.status === 'done').length },
  ];

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId !== destination.droppableId) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === draggableId
            ? { ...task, status: destination.droppableId as Task['status'] }
            : task
        )
      );
    }
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        assignees: [],
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', status: 'backlog' });
      setShowAddTask(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'backlog': return 'border-l-red-400';
      case 'todo': return 'border-l-yellow-400';
      case 'in-progress': return 'border-l-blue-400';
      case 'done': return 'border-l-green-400';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Task Allotment</h1>
        <button
          onClick={() => setShowAddTask(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                className="input-field"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <textarea
                placeholder="Task description"
                className="input-field"
                rows={3}
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <select
                className="input-field"
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button onClick={addTask} className="btn-primary">
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {column.count}
                </span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] ${
                      snapshot.isDraggingOver ? 'bg-blue-50' : ''
                    }`}
                  >
                    {tasks
                      .filter((task) => task.status === column.id)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${getStatusColor(
                                task.status
                              )} ${
                                snapshot.isDragging ? 'shadow-lg' : ''
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900 text-sm">
                                  {task.title}
                                </h4>
                                <button className="text-gray-400 hover:text-gray-600">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                              
                              {task.description && (
                                <p className="text-xs text-gray-600 mb-3">
                                  {task.description}
                                </p>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                  {task.dueDate && (
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {task.dueDate.toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex items-center">
                                  {task.assignees.length > 0 ? (
                                    <div className="flex -space-x-1">
                                      {task.assignees.slice(0, 2).map((assignee) => (
                                        <div
                                          key={assignee.id}
                                          className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                                        >
                                          {assignee.name.charAt(0)}
                                        </div>
                                      ))}
                                      {task.assignees.length > 2 && (
                                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                          +{task.assignees.length - 2}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                      <User className="w-3 h-3 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskAllotment;